import Link from "next/link";
import Avatar from "./ui/avatar";
import RateStars from "./rate-stars";
import { compareDesc, formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

interface RatingHeaderProps {
  user: {
    name: string;
    image: string;
    slug: string;
  };
  createdAt: string | Date;
  updatedAt: string | Date;
  rate: number;
}

export default function RatingHeader({
  user,
  createdAt,
  updatedAt,
  rate,
}: RatingHeaderProps) {
  const updatedAtIsRecent = !!compareDesc(updatedAt, createdAt);

  const distance = formatDistanceToNow(createdAt, {
    locale: ptBR,
    addSuffix: true,
  });

  return (
    <header className="flex gap-4">
      <Link
        href={`/profile/${user.slug}`}
        className="transition-opacity hover:opacity-80"
      >
        <Avatar src={user.image} alt={`Foto de perfil do(a) ${user.name}`} />
      </Link>

      <div>
        <Link href={`/profile/${user.slug}`} className="hover:underline">
          {user.name}
        </Link>
        <p className="text-sm text-gray-400">
          {distance} {updatedAtIsRecent && "(editado)"}
        </p>
      </div>
      <RateStars rate={rate} className="ml-auto" />
    </header>
  );
}
