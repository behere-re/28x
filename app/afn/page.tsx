export default function AFNPage() {
  return (
    <div className="prose">

      {/* Section 1 — Hero */}
      <span className="section-label">A 28X Standard Proposal</span>
      <h1>The Anml Field Note Standard</h1>
      <p className="text-secondary !max-w-paragraph" style={{ fontSize: '20px', lineHeight: '1.6' }}>
        A two-layer architecture for provable private presence —
        public proof on Algorand, private content owned by the family.
      </p>
      <p className="text-secondary" style={{ fontSize: '14px' }}>
        Version: 0.1 Draft · Epoch: 28X-0000-01-01 · Status: Active
      </p>
      <hr />

      {/* Section 2 — The Problem */}
      <h2>The problem</h2>
      <p>
        For generations, the record of a child&apos;s learning has lived in
        institutions — schools, districts, testing companies — that families
        never controlled and rarely benefited from. This data is among the most
        intimate generated at scale, yet families have had no sovereign
        infrastructure to hold it.
      </p>
      <p>
        Every platform that offers to store family data today operates on the
        same model: collect privately, profit centrally. The family generates
        the data. The platform owns it. There is no architectural alternative
        that preserves both the intimacy of the content and the provability
        of the practice.
      </p>

      {/* Section 3 — The Proposal */}
      <h2>The proposal</h2>
      <p>
        An Anml Field Note (AFN) is a family-generated moment — a voice note,
        a photograph, a written observation — that produces two distinct
        artifacts with a cryptographic relationship between them.
      </p>

      <div className="grid md:grid-cols-2 gap-6 my-10 !max-w-none">
        <div className="bg-card border border-border rounded-lg p-6 shadow-[0_1px_4px_rgba(0,0,0,0.06)]">
          <span className="section-label !mb-3">Public Layer — Algorand</span>
          <h3 className="!mt-0 !mb-3">Proof of Presence</h3>
          <p className="text-secondary text-sm !mb-0" style={{ lineHeight: '1.65' }}>
            Minted as an Algorand Standard Asset at the moment of capture.
            Contains: 28x timestamp coordinate, guide character identifier,
            season identifier, content hash, family wallet address.
            Contains no private content.
          </p>
        </div>
        <div className="bg-card border border-border rounded-lg p-6 shadow-[0_1px_4px_rgba(0,0,0,0.06)]">
          <span className="section-label !mb-3">Private Layer — Family Owned</span>
          <h3 className="!mt-0 !mb-3">The Moment Itself</h3>
          <p className="text-secondary text-sm !mb-0" style={{ lineHeight: '1.65' }}>
            Voice recording, transcript, photographs, guide response,
            child observations. Encrypted before leaving the family&apos;s device.
            Stored in a location only the family can decrypt.
            Never transmitted in plaintext to any server.
          </p>
        </div>
      </div>

      <p className="text-secondary italic" style={{ fontSize: '15px' }}>
        The content hash in the public proof cryptographically links both
        layers — without exposing private content. The family can prove
        presence without revealing the moment.
      </p>

      {/* Section 4 — The Epoch */}
      <h2>The epoch</h2>
      <p>
        AFN Season 1 begins on 28X-0000-01-01 — the first day of Year 0000
        in the 28x temporal standard. Gregorian equivalent: March 20, 2026,
        at the Spring equinox UTC.
      </p>
      <p>
        Field notes minted from this date carry a 28x coordinate in their
        on-chain metadata, anchoring them permanently to the new temporal
        record. The first Anml Field Notes are not just family artifacts —
        they are the first entries in a new way of marking time.
      </p>

      {/* Section 5 — Reference Implementation */}
      <h2>Reference implementation</h2>
      <p>
        Bēhere is the first AFN-compliant application. It launches on
        Year 0000 Day 1 — March 20, 2026 — with families in Santa Barbara
        County, California.
      </p>
      <p>
        Bēhere runs outdoor enrichment programs and a family field note app.
        Families choose a character guide — A. Snake, Nortina, Trunq, or Xero
        — and capture daily moments together. Each capture produces an AFN:
        private content held by the family, public proof minted on Algorand.
      </p>

      <div className="bg-card border border-border rounded-lg p-6 shadow-[0_1px_4px_rgba(0,0,0,0.06)] my-10 !max-w-none">
        <p className="font-display !mb-1 text-primary" style={{ fontSize: '20px', fontWeight: 600 }}>
          Bēhere
        </p>
        <p className="!mb-1">
          <a href="https://we.behere.re" target="_blank" rel="noopener noreferrer">
            we.behere.re
          </a>
        </p>
        <p className="text-secondary text-sm !mb-0">
          Launching 28X-0000-01-01
        </p>
      </div>

      {/* Section 6 — Season 2 */}
      <h2>Season 2: completing the privacy stack</h2>
      <p>
        The AFN standard is designed for progressive privacy implementation.
        Season 1 (28X-0000) establishes the public proof layer and family
        wallet architecture on Algorand.
      </p>
      <p>
        Season 2 (28X-0001) introduces blind compute via Nillion Network —
        storing decryption keys in a compute environment where no single party
        can reconstruct them unilaterally. The family&apos;s Algorand wallet address
        serves as the access credential. At full implementation, no party —
        including Bēhere — holds the content, the key, and the proof
        simultaneously.
      </p>

      <div className="bg-card border border-border rounded-lg p-6 my-10 !max-w-none font-mono text-sm leading-relaxed">
        <p className="!mb-2 text-secondary">Family device → <span className="text-primary">[encrypted content]</span> → Cloudflare R2</p>
        <p className="!mb-2 text-secondary">Family device → <span className="text-primary">[decryption key]</span> → Nillion (wallet-gated)</p>
        <p className="!mb-0 text-secondary">Family device → <span className="text-primary">[content hash + metadata]</span> → Algorand (AFN token)</p>
      </div>

      {/* Section 7 — Open Standard */}
      <h2>An open standard</h2>
      <p>
        The AFN standard is proposed as an open protocol. Other applications,
        developers, and educational institutions are invited to build
        AFN-compliant implementations. The specification will be maintained
        and versioned at 28x.org.
      </p>
      <p>
        If you are building something that could benefit from provable private
        presence — for families, learners, communities — we want to hear from
        you.
      </p>
      <p>
        Contact: <a href="mailto:afn@28x.org">afn@28x.org</a>
      </p>

      {/* Section 8 — Footer Callout */}
      <div className="bg-card border border-border rounded-lg p-6 mt-16 !max-w-none">
        <p className="text-secondary text-sm !mb-0">
          This is version 0.1 of the AFN standard. It is a living document.
          Feedback and implementations welcome.
        </p>
      </div>
    </div>
  )
}
