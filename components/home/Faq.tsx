import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FAQ } from "@/data/faq";

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="pb-8">
      <Container>
        <SectionHeader id="faq-title" eyebrow="Вопросы" title="Коротко о подписке" />
        <div className="grid grid-cols-4 gap-x-4 md:grid-cols-8 md:gap-x-6 lg:grid-cols-12">
          <div className="col-span-4 md:col-span-8 lg:col-span-9 lg:col-start-4">
            {FAQ.map((item) => (
              <details key={item.q} className="group border-b border-line first:border-t">
                <summary className="flex cursor-pointer items-center justify-between gap-6 py-6 text-h3">
                  {item.q}
                  <span
                    aria-hidden="true"
                    className="relative size-4 shrink-0 before:absolute before:top-1/2 before:left-0 before:h-px before:w-4 before:bg-ink after:absolute after:top-0 after:left-1/2 after:h-4 after:w-px after:bg-ink after:transition-transform after:duration-300 group-open:after:scale-y-0 motion-reduce:after:transition-none"
                  />
                </summary>
                <p className="max-w-2xl pb-8 text-ink-muted">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
