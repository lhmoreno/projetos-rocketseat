import { PrismaClient, Rating } from "@prisma/client";
import { books as booksConstant } from "./constants/books";
import { fakerPT_BR as faker } from "@faker-js/faker";
import { add } from "date-fns";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany();
  await prisma.book.deleteMany();

  const users = Array.from({ length: 100 }).map((_, index) => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const name = firstName + " " + lastName;

    return {
      id: faker.string.uuid(),
      name,
      createdAt: faker.date.between({
        from: "2020-01-01T00:00:00.000Z",
        to: "2024-07-11T00:00:00.000Z",
      }),
      image: `https://randomuser.me/api/portraits/women/${index}.jpg`,
      email: faker.internet.email({
        firstName,
        lastName,
      }),
      slug: faker.helpers.slugify(name + " " + index).toLocaleLowerCase(),

      authorsReadAmount: 0,
      booksPageReadAmount: 0,
      ratingedBooksAmount: 0,
      mostReadCategory: "Nenhuma",
    };
  });

  const books = booksConstant.map((book) => {
    return {
      id: book.id,
      name: book.name,
      author: book.author,
      summary: faker.lorem.paragraph({ min: 3, max: 5 }),
      coverUrl: book.coverUrl,
      totalPages: book.totalPages,
      categories: book.categories,

      rate: 0,
      ratingsAmount: 0,
    };
  });

  const booksIds = books.map((b) => b.id);

  const ratings = users.reduce<Rating[]>((result, user) => {
    const ratingsAmount = faker.number.int({ min: 0, max: books.length });

    let userBooksIds = booksIds;

    const userRatings = Array.from({ length: ratingsAmount }).map(() => {
      const bookId = faker.helpers.arrayElement(userBooksIds);
      const createdAt = faker.date.between({
        from: "2020-01-01T00:00:00.000Z",
        to: "2024-07-11T00:00:00.000Z",
      });

      userBooksIds = userBooksIds.filter((id) => id !== bookId);

      return {
        userId: user.id,
        bookId,
        id: faker.string.uuid(),
        rate: faker.number.float({ min: 3, max: 5, multipleOf: 0.5 }),
        description: faker.lorem.paragraph({ min: 3, max: 5 }),
        createdAt,
        updatedAt: faker.datatype.boolean({ probability: 0.3 })
          ? add(createdAt, { months: 1 })
          : createdAt,
      } as Rating;
    });

    return [...result, ...userRatings];
  }, []);

  console.log("Total ratings:", ratings.length);

  const usersSeed = users.map((user) => {
    const userRatings = ratings.filter((rating) => rating.userId === user.id);

    const { authorsReadAmount, booksPageReadAmount, mostReadCategory } =
      userRatings.reduce(
        (result, rating, index) => {
          const newResult = result;

          const book = books.find((book) => book.id === rating.bookId);

          if (!book) return result;

          if (!result.authors.includes(book.author)) {
            newResult.authors = [...newResult.authors, book.author];
            newResult.authorsReadAmount += 1;
          }

          book.categories.forEach((category) => {
            const index = newResult.categoriesCount.findIndex(
              (c) => c.category === category
            );

            if (index >= 0) {
              newResult.categoriesCount[index].count += 1;
            } else {
              newResult.categoriesCount.push({
                category,
                count: 1,
              });
            }
          });

          if (index === userRatings.length - 1) {
            newResult.mostReadCategory = newResult.categoriesCount.reduce(
              (max, item) => (item.count > max.count ? item : max),
              newResult.categoriesCount[0]
            ).category;
          }

          newResult.booksPageReadAmount += book.totalPages;

          return newResult;
        },
        {
          authorsReadAmount: 0,
          booksPageReadAmount: 0,
          mostReadCategory: "",
          authors: [""],
          categoriesCount: [{ category: "Nenhuma", count: 0 }],
        }
      );

    return prisma.user.create({
      data: {
        ...user,

        authorsReadAmount,
        booksPageReadAmount,
        ratingedBooksAmount: userRatings.length,
        mostReadCategory,
      },
    });
  });

  const booksSeed = books.map((book) => {
    const bookRatings = ratings.filter((rating) => rating.bookId === book.id);

    return prisma.book.create({
      data: {
        ...book,

        rate: bookRatings.reduce<number>((rate, rating, i, list) => {
          if (i === list.length - 1) {
            const amount = (rate += rating.rate);
            const avarage = amount / list.length;

            return Number(avarage.toFixed(1));
          }

          return (rate += rating.rate);
        }, 0),
        ratingsAmount: bookRatings.length,
      },
    });
  });

  const ratingsSeed = ratings.map((rating) => {
    return prisma.rating.create({
      data: rating,
    });
  });

  await prisma.$transaction([...booksSeed, ...usersSeed, ...ratingsSeed]);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
