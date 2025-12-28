import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Why Now: Temporal Integrity in the Age of Intelligent Systems',
  description: 'Why a new time standard matters in the age of intelligent systems.',
}

export default function WhyNowPage() {
  return (
    <div className="prose">
      <h1>Why Now: Temporal Integrity in the Age of Intelligent Systems</h1>

      <h2>The Problem of Irregular Time</h2>
      <p>
        For centuries, humans have managed temporal complexity through calendars that accumulate irregularity. The Gregorian calendar, for all its utility, is a system of historical compromises: months of varying lengths, leap years that follow complex rules, and weeks that do not align cleanly with months or years. This irregularity is manageable when time is primarily a human concern, parsed by human minds and recorded by human hands.
      </p>
      <p>
        But we are entering an era where time is increasingly a computational concern. Intelligent systems—whether artificial intelligence, distributed databases, or automated scheduling—process temporal data at scales and speeds that amplify the cognitive overhead of irregular calendars. A system that must constantly account for February&apos;s 28 days (or 29), or calculate which years are leap years, expends computational resources on edge cases rather than core logic.
      </p>

      <h2>The Cost of Edge Cases</h2>
      <p>Every irregularity in a calendar system becomes an edge case in code. Consider the common task of calculating &quot;30 days from today&quot;:</p>
      <ul>
        <li>In the Gregorian calendar, this requires checking the current month, handling month boundaries, accounting for varying month lengths, and potentially crossing year boundaries with leap year considerations.</li>
        <li>In 28x, this calculation is trivial: add 30 to the day number, modulo 28, and increment the month if necessary. The algorithm is identical regardless of the starting date.</li>
      </ul>
      <p>
        This is not a matter of convenience; it is a matter of efficiency, reliability, and correctness. When temporal logic is simpler, fewer bugs occur. When temporal logic is predictable, systems can be optimized more effectively.
      </p>

      <h2>The Demand for Regularity</h2>
      <p>
        As we delegate more temporal reasoning to machines, we should provide them with temporal systems that match their strengths: regularity, predictability, and arithmetic simplicity. This is not a rejection of human-centered design, but an acknowledgment that the infrastructure of time—the systems that underlie human experience—must serve both human intuition and computational clarity.
      </p>

      <h2>A Standard for Systems</h2>
      <p>
        28x is not proposed as a replacement for the Gregorian calendar in everyday use. Rather, it is a standard for systems: databases, APIs, logs, scientific instruments, and the growing class of applications where temporal precision and computational simplicity matter more than historical continuity.
      </p>
      <p>
        Just as we have standardized protocols for network communication and data formats, we should standardize temporal representation where computational clarity is paramount. This is not about replacing calendars; it is about providing a reliable, regular foundation for the systems that increasingly mediate our relationship with time.
      </p>

      <h2>The Window of Opportunity</h2>
      <p>We are at a moment when:</p>
      <ul>
        <li>Intelligent systems are becoming ubiquitous</li>
        <li>Temporal data is growing exponentially</li>
        <li>Standards for machine-readable time are still being established</li>
        <li>The cost of adopting a new standard is lower than it will be in the future</li>
      </ul>
      <p>
        If we wait, we compound the problem: more systems built on irregular foundations, more code that must handle edge cases, more complexity that becomes harder to unwind.
      </p>
      <p>
        The time to establish a regular temporal standard is now, before the infrastructure of intelligent systems solidifies around the irregularities of historical calendars.
      </p>

      <h2>Conclusion</h2>
      <p>
        28x is not about rejecting the past or creating a &quot;better&quot; calendar for humans. It is about providing a clean, regular foundation for the computational systems that are becoming central to how we understand and interact with time. In the age of intelligent systems, temporal integrity means regularity, predictability, and simplicity—values that serve both machines and the humans who rely on them.
      </p>
    </div>
  )
}

