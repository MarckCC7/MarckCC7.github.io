import { GrowingSeed } from '@components/easter-eggs/GrowingSeed';
import { GardenScene } from '@components/garden/GardenScene';
import { Reveal } from '@components/motion/Reveal';
import { Seo } from '@components/seo/Seo';
import { Container } from '@components/ui/Container';
import { GlassCard } from '@components/ui/GlassCard';
import { PageHeader } from '@layouts/PageHeader';
import { certificates } from '@data/certificates';
import { projects } from '@data/projects';
import { sortedUpdates } from '@data/updates';

/** Legend explaining the metaphor — once, plainly, so it never needs a tooltip. */
const LEGEND = [
  { glyph: '🌱', title: 'Plantas', body: 'Proyectos. Su altura es la etapa real en la que están.' },
  { glyph: '🌳', title: 'Árboles', body: 'Certificados. Ya echaron raíz y no se mueven.' },
  { glyph: '🌸', title: 'Flores', body: 'Publicaciones. Cada una abre cuando pasa algo.' },
];

export function GardenPage() {
  return (
    <>
      <Seo
        title="El jardín"
        path="/garden"
        description="Un mapa vivo de todo lo que Marco Collado está construyendo: proyectos como plantas, certificados como árboles y publicaciones como flores."
      />

      <PageHeader
        eyebrow="The Digital Garden"
        title="Todo lo que estoy construyendo, en un solo terreno."
        description="Este es el mapa completo. Nada aquí es decorativo: cada planta, árbol y flor se genera desde el contenido real del sitio, así que el jardín crece solo cuando yo crezco."
      />

      <Container className="pb-section">
        {/* — Counts ————————————————————————————————— */}
        <Reveal className="mb-12">
          <dl className="grid grid-cols-3 gap-3 sm:max-w-lg">
            {[
              { label: 'Plantas', value: projects.length },
              { label: 'Árboles', value: certificates.length },
              { label: 'Flores', value: sortedUpdates.length },
            ].map((stat) => (
              <div key={stat.label} className="glass rounded-2xl px-4 py-4">
                <dt className="text-[0.625rem] tracking-[0.08em] text-ink-muted uppercase">
                  {stat.label}
                </dt>
                <dd className="mt-1 font-mono text-2xl text-ink tabular-nums">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        {/* — The plot —————————————————————————————— */}
        <GardenScene />

        {/* — Legend + the growing tree ——————————————— */}
        <div className="mt-16 grid gap-5 lg:grid-cols-[1.3fr_1fr]">
          <Reveal>
            <GlassCard className="h-full p-7">
              <h2 className="font-display text-lg font-semibold tracking-tight text-ink">
                Cómo leer este jardín
              </h2>

              <ul className="mt-6 space-y-5">
                {LEGEND.map((entry) => (
                  <li key={entry.title} className="flex items-start gap-4">
                    <span aria-hidden className="text-xl leading-none">
                      {entry.glyph}
                    </span>
                    <div>
                      <h3 className="text-sm font-medium text-ink">{entry.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-ink-secondary">
                        {entry.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

              <p className="mt-7 border-t border-line-subtle pt-6 text-sm leading-relaxed text-ink-muted">
                Un jardín digital se ve inacabado a propósito. Si dentro de un año esto se ve
                idéntico, algo salió mal.
              </p>
            </GlassCard>
          </Reveal>

          <Reveal delay={0.08}>
            <GlassCard className="flex h-full flex-col items-center justify-center p-7" glow>
              <p className="text-pixel text-[0.5rem] text-ink-muted">Tu propia semilla</p>
              <GrowingSeed className="mt-4" />
            </GlassCard>
          </Reveal>
        </div>
      </Container>
    </>
  );
}
