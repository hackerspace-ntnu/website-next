import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import { Link } from '@/components/ui/Link';

function CategoryCard({
  name,
  description,
  href,
}: {
  name: string;
  description: string;
  href: React.ComponentProps<typeof Link>['href'];
}) {
  return (
    <Link href={href}>
      <Card>
        <CardHeader>
          <CardTitle>{name}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}

export { CategoryCard };
