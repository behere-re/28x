export default function DevelopersPage() {
  return (
    <div className="prose">
      <h1>Developer documentation</h1>
      <p>
        The <strong>28x Time API</strong> is the official time service for the 28x temporal standard.
        It provides the current 28x date, conversion between Gregorian and 28x, season information,
        and AFN minting coordinates. No authentication required; all responses are JSON; CORS is enabled for all origins.
      </p>
      <p>
        <strong>Base URL:</strong>{' '}
        <a href="https://api.28x.org" target="_blank" rel="noopener noreferrer">
          https://api.28x.org
        </a>
      </p>

      <h2>Endpoints</h2>
      <table>
        <thead>
          <tr>
            <th>Method</th>
            <th>Path</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>GET</code></td>
            <td><code>/</code></td>
            <td>API documentation (JSON)</td>
          </tr>
          <tr>
            <td><code>GET</code></td>
            <td><code>/now</code></td>
            <td>Current moment in 28x time</td>
          </tr>
          <tr>
            <td><code>GET</code></td>
            <td><code>/convert</code></td>
            <td>Convert between Gregorian and 28x</td>
          </tr>
          <tr>
            <td><code>GET</code></td>
            <td><code>/premium/convert</code></td>
            <td>x402-protected premium conversion with attestation</td>
          </tr>
          <tr>
            <td><code>GET</code></td>
            <td><code>/season</code></td>
            <td>Season information for a 28x year</td>
          </tr>
          <tr>
            <td><code>GET</code></td>
            <td><code>/afn-coordinate</code></td>
            <td>28x coordinate for AFN minting</td>
          </tr>
          <tr>
            <td><code>GET</code></td>
            <td><code>/health</code></td>
            <td>Health check</td>
          </tr>
        </tbody>
      </table>

      <h2>GET /</h2>
      <p>Returns API metadata and endpoint list as JSON. No query parameters.</p>

      <h2>GET /now</h2>
      <p>Returns the current moment in 28x time. No query parameters.</p>
      <p><strong>Response shape:</strong> <code>gregorian</code> (iso, unix, date, time), <code>28x</code> (coordinate, canonicalCoordinate, year, month, day, season, seasonDay, humanReadable, isIntercalary, isLeapYear, dayOfYear, daysRemainingInYear, daysRemainingInMonth, daysRemainingInSeason), <code>meta</code> (epochGregorian, totalDaysSinceEpoch, apiVersion).</p>

      <h2>GET /convert</h2>
      <p>Convert a Gregorian date to 28x, or a 28x coordinate to Gregorian.</p>
      <p><strong>Query parameters:</strong></p>
      <ul>
        <li><code>from</code> (required): <code>gregorian</code> | <code>28x</code> | <code>unix</code></li>
        <li>If <code>from=gregorian</code>: <code>date</code> — ISO date or datetime (e.g. <code>2026-03-20</code> or <code>2026-03-20T14:32:00Z</code>)</li>
        <li>If <code>from=28x</code>: <code>coordinate</code> — 28x coordinate (e.g. <code>28X-0000-01-15</code>, <code>28X-0000-ID</code>, or legacy <code>28X-0000-00-00</code>)</li>
        <li>If <code>from=unix</code>: <code>timestamp</code> — Unix timestamp in seconds</li>
      </ul>
      <p><strong>Example:</strong> <code>GET /convert?from=gregorian&amp;date=2026-03-20</code></p>
      <p><strong>Response:</strong> Same shape as <code>/now</code> for the given moment. Pre-epoch dates include <code>28x.preEpoch</code>, <code>28x.daysBeforeEpoch</code>, <code>28x.isTransitionDay</code>.</p>

      <h2>GET /premium/convert</h2>
      <p>x402-protected conversion endpoint for paid agent and developer workflows.</p>
      <p><strong>Query parameters:</strong> Same as <code>/convert</code>.</p>
      <p><strong>Payment:</strong> Requires x402 payment when configured by the API operator. The initial unpaid response returns HTTP <code>402</code> with payment requirements.</p>
      <p><strong>Response:</strong> <code>premium</code>, <code>product</code>, <code>conversion</code> (same shape as <code>/now</code>), <code>attestation</code> (id, issuedAt, source, standard, hashAlgorithm), and <code>payment</code> metadata.</p>

      <h2>GET /season</h2>
      <p>Returns full season information for a 28x year.</p>
      <p><strong>Query parameters:</strong></p>
      <ul>
        <li><code>year</code> (optional): 28x year number (e.g. <code>0</code>). Defaults to current 28x year.</li>
      </ul>
      <p><strong>Leap rule:</strong> 28x years divisible by 4 are leap years, except Year 0000.</p>
      <p><strong>Response:</strong> <code>year</code>, <code>seasons</code> (spring, summer, autumn, winter: name, startGregorian, endGregorian, start28x, end28x, durationDays), <code>intercalaryDays</code> (coordinate, canonicalCoordinate, gregorian, label), <code>isLeapYear</code>, <code>totalDays</code>.</p>

      <h2>GET /afn-coordinate</h2>
      <p>Returns the 28x coordinate and mint recommendation for AFN (A Field Note) metadata.</p>
      <p><strong>Query parameters:</strong></p>
      <ul>
        <li><code>timestamp</code> (optional): ISO datetime or Unix ms. Defaults to now.</li>
      </ul>
      <p><strong>Response:</strong> <code>afnCoordinate</code>, <code>afnSeason</code>, <code>afnYear</code>, <code>afnSeasonLabel</code>, <code>gregorianISO</code>, <code>mintRecommendation</code> (coordinate, season, year, seasonIdentifier, humanLabel). Pre-epoch timestamps return a valid coordinate using negative-year notation per spec section 6.4 (e.g. <code>28X--0001-13-20</code>). The <code>mintRecommendation.preEpoch</code> field is <code>true</code> for these responses. Season fields are <code>null</code> for pre-epoch coordinates.</p>

      <h2>GET /health</h2>
      <p>Health check. No parameters.</p>
      <p><strong>Response:</strong> <code>{`{ "status": "ok", "time28x": "28X-0000-01-01" }`}</code></p>

      <h2>Errors</h2>
      <p>Validation and not-found errors return JSON:</p>
      <pre><code>{`{ "error": "descriptive message", "code": "ERROR_CODE" }`}</code></pre>
      <p>HTTP status 400 for bad parameters; 404 for unknown paths.</p>

      <h2>Examples</h2>
      <h3>curl</h3>
      <pre><code>curl https://api.28x.org/now
curl &quot;https://api.28x.org/convert?from=gregorian&amp;date=2026-03-20&quot;
curl &quot;https://api.28x.org/afn-coordinate?timestamp=2026-03-20T14:32:00Z&quot;</code></pre>
      <h3>fetch (JavaScript)</h3>
      <pre><code>{`const res = await fetch('https://api.28x.org/now');
const data = await res.json();
console.log(data['28x'].coordinate);`}</code></pre>

      <p>
        <a href="https://api.28x.org" target="_blank" rel="noopener noreferrer">
          Open live API →
        </a>
      </p>
      <p>
        Calendar specification: <a href="/standard">28x Time Standard</a>. AFN metadata: <a href="/afn">A Field Note standard</a>.
      </p>
    </div>
  )
}
