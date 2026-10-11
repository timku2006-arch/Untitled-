import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <Container className="py-24 lg:py-40">
      <p className="text-label uppercase text-ink-muted">404</p>
      <h1 className="mt-6 text-h1">Такой страницы нет</h1>
      <p className="mt-6 max-w-md text-ink-muted">Возможно, раздел ещё готовится или ссылка устарела.</p>
      <ButtonLink href="/" className="mt-10">
        На главную
      </ButtonLink>
    </Container>
  );
}
