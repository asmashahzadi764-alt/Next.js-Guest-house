// Renders "&" in the plain body font instead of the decorative heading font.
export function Amp({ t }: { t: string }) {
  const parts = t.split('&')
  return <>{parts.map((p, i) => (i === 0 ? p : <span key={i}><span className="font-body">&amp;</span>{p}</span>))}</>
}