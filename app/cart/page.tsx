import type { Metadata } from "next";
import { CartView } from "@/components/cart/CartView";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Корзина",
  robots: { index: false },
};

export default function CartPage() {
  return (
    <>
      <PageHeader eyebrow="Корзина" title="Ваш заказ" />
      <Container>
        <CartView />
      </Container>
    </>
  );
}
