import type { ReactNode } from "react";
import atlasHero from "@/assets/casestudies/atlas-hero.gif";
import tutorialsHero from "@/assets/casestudies/tutorials-hero.png";

interface SectionProps { title: string; children: ReactNode; }
const Section = ({ title, children }: SectionProps) => (
  <section className="mt-8">
    <h2 className="text-[20px] mb-3 pb-1 border-b-2 border-black" style={{ fontFamily: "var(--font-chicago)" }}>
      {title}
    </h2>
    <div className="space-y-3 text-[13px] leading-relaxed">{children}</div>
  </section>
);

const Meta = ({ rows }: { rows: [string, string][] }) => (
  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 mb-2">
    {rows.map(([k, v]) => (
      <div key={k} className="bevel-in bg-white p-2">
        <div className="text-[11px] uppercase text-platinum-dark tracking-wider">{k}</div>
        <div className="text-[13px] mt-0.5">{v}</div>
      </div>
    ))}
  </div>
);

const Disclaimer = () => (
  <div className="bevel-in bg-white p-2 my-4 text-[12px]">
    <strong>Disclaimer:</strong> Certain details, processes, and data have been omitted due to NDA. For a more comprehensive view of my work, please contact me directly.
  </div>
);

export function AtlasCaseStudy() {
  return (
    <article style={{ fontFamily: "var(--font-chicago)" }}>
      <h1 className="text-[36px] leading-none mb-1">atlas search playground</h1>
      <p className="text-[16px] italic text-platinum-dark">easy experimentation with zero setup</p>

      <Meta rows={[
        ["Role", "Product Designer"],
        ["Timeline", "3 months"],
        ["Tools", "Figma"],
        ["Stakeholders", "PMs, Eng, GTM"],
      ]} />

      <div className="bevel-in bg-white p-1 my-4">
        <img src={atlasHero} alt="Atlas Search Playground demonstration showing user selecting a dataset, typing a query, and seeing instant results" className="w-full block" />
      </div>

      <Disclaimer />

      <Section title="Project Overview">
        <p><strong>The challenge.</strong> Atlas Search is MongoDB's full-text search solution. But getting started required significant setup: creating a cluster, loading data into collections, building search indexes, and waiting for them to sync before writing your first query.</p>
        <p><strong>The solution.</strong> I designed the <em>Atlas Search Playground</em> — a zero-setup environment where users can immediately experiment with Atlas Search using pre-loaded sample datasets and pre-configured search indexes. No cluster creation. No data loading. No waiting.</p>
        <p><strong>The impact.</strong> The playground became the fastest way to experience Atlas Search capabilities, serving as both a learning tool for new users and a demo environment for sales teams. It eliminated the biggest barrier to Atlas Search adoption: the setup friction.</p>
      </Section>

      <Section title="Understanding the Friction">
        <div className="grid md:grid-cols-2 gap-3">
          <div className="bevel-in bg-white p-3">
            <div className="font-bold mb-1">The old way</div>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Create a MongoDB Atlas cluster</li>
              <li>Load sample data into collections</li>
              <li>Create and configure search indexes</li>
              <li>Wait 10–30 minutes for indexes to build</li>
              <li>Learn aggregation pipeline syntax, write your first search</li>
            </ol>
            <p className="mt-2 italic">Many users abandoned evaluation before seeing Atlas Search in action.</p>
          </div>
          <div className="bevel-in bg-white p-3">
            <div className="font-bold mb-1">The playground way</div>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Visit the playground URL</li>
              <li>Select a pre-loaded dataset</li>
              <li>Run queries immediately</li>
            </ol>
            <p className="mt-2 italic">Users experience Atlas Search value in under 60 seconds.</p>
          </div>
        </div>
      </Section>

      <Section title="The Multi-View Challenge">
        <p>One of the key design challenges was that Atlas Search requires users to access multiple pieces of information simultaneously:</p>
        <ul className="list-disc pl-6">
          <li>Index definition (field mappings and analyzers)</li>
          <li>Query syntax documentation and examples</li>
          <li>Data collection structure and sample documents</li>
          <li>Synonym collections (when applicable)</li>
          <li>Query results with relevance scoring</li>
        </ul>
        <p>Traditionally, these were scattered across different interfaces. Users juggled browser tabs and constantly context-switched.</p>
      </Section>

      <Section title="Designing for Developer Comfort">
        <p>A crucial insight: developers are most comfortable in environments that feel familiar — like their IDE or command line. Rather than a typical web app, I emulated the multi-panel, information-dense layouts developers use daily.</p>
        <div className="grid md:grid-cols-2 gap-3">
          <div className="bevel-in bg-white p-3">
            <div className="font-bold">CLI / IDE inspiration</div>
            <ul className="list-disc pl-5 mt-1">
              <li>Dark theme with syntax highlighting</li>
              <li>Monospace fonts for code readability</li>
              <li>Resizable panels for information density</li>
              <li>Keyboard shortcuts for power users</li>
              <li>Real-time feedback and error highlighting</li>
            </ul>
          </div>
          <div className="bevel-in bg-white p-3">
            <div className="font-bold">Developer workflow patterns</div>
            <ul className="list-disc pl-5 mt-1">
              <li>Immediate execution and results</li>
              <li>Contextual help without leaving the interface</li>
              <li>Version control and sharing capabilities</li>
              <li>Progressive disclosure of advanced features</li>
            </ul>
          </div>
        </div>
      </Section>

      <Section title="Impact &amp; Adoption">
        <div className="grid grid-cols-3 gap-3 my-2">
          {[["<60s","Time to first query"],["0","Setup steps"],["100%","Features available"]].map(([n,l]) => (
            <div key={l} className="bevel-in bg-white p-3 text-center">
              <div className="text-[28px] font-bold leading-none">{n}</div>
              <div className="text-[11px] mt-1 uppercase tracking-wider">{l}</div>
            </div>
          ))}
        </div>
        <ul className="list-disc pl-6">
          <li><strong>Improved customer service.</strong> Technical service engineers replicate customer issues, ship quicker fixes, and share solutions easily.</li>
          <li><strong>Developer adoption.</strong> Showed statistically significant movement in adoption.</li>
          <li><strong>Education &amp; onboarding.</strong> Embedded as a recommended starting point in product and docs.</li>
          <li><strong>Product innovation.</strong> Enabled the no-code search demo builder and chatbot demo builder.</li>
        </ul>
      </Section>

      <Section title="Key Learnings">
        <p><strong>Friction is the enemy of adoption.</strong> Even a few extra steps can cause potential users to abandon their evaluation. Eliminating friction can transform a complex enterprise feature into an accessible, immediately valuable tool.</p>
        <p><strong>Design for developer mental models.</strong> Emulating familiar IDE and CLI patterns made the playground feel immediately comfortable and reduced the learning curve significantly.</p>
      </Section>

      <div className="mt-8 flex flex-wrap gap-2">
        <a href="https://search-playground.mongodb.com/tools/code-sandbox/snapshots/new" target="_blank" rel="noreferrer"
           className="bevel-button px-3 py-1 text-[13px]">Check it out →</a>
        <a href="https://www.mongodb.com/company/blog/technical/atlas-search-playground-easy-experimentation" target="_blank" rel="noreferrer"
           className="bevel-button px-3 py-1 text-[13px]">Read the blog post →</a>
      </div>
    </article>
  );
}

export function TutorialsCaseStudy() {
  return (
    <article style={{ fontFamily: "var(--font-chicago)" }}>
      <h1 className="text-[36px] leading-none mb-1">composable tutorials</h1>
      <p className="text-[16px] italic text-platinum-dark">personalized documentation experiences</p>

      <Meta rows={[
        ["Role", "Product Designer"],
        ["Timeline", "6 months"],
        ["Tools", "Figma"],
        ["Stakeholders", "Docs Team, Eng"],
      ]} />

      <div className="bevel-in bg-white p-1 my-4">
        <img src={tutorialsHero} alt="MongoDB documentation page showing composable tutorial system with dropdown selectors for deployment type, interface, and language" className="w-full block" />
      </div>

      <Disclaimer />

      <Section title="Project Overview">
        <p><strong>The challenge.</strong> MongoDB documentation pages often need to serve multiple user contexts — different programming languages, deployment methods, database versions, and experience levels. Traditional approaches using nested tabs created confusing navigation and forced repeated selections throughout the reading experience.</p>
        <p><strong>The solution.</strong> I designed a <em>composable tutorial system</em> that lets users customize their docs experience upfront. By making key selections at the beginning, users receive a personalized, linear reading experience tailored to their context.</p>
        <p><strong>The impact.</strong> The system eliminated nested tabs, improved content discoverability, and created better experiences for both human readers and AI systems. It also empowered docs writers with a flexible authoring system that scales with content complexity.</p>
      </Section>

      <Section title="The Dual User Challenge">
        <div className="grid md:grid-cols-2 gap-3">
          <div className="bevel-in bg-white p-3">
            <div className="font-bold">External users</div>
            <p className="mt-1"><strong>Goal:</strong> find relevant info quickly and complete their task.</p>
            <p><strong>Pain points:</strong> nested tabs, repeated selections, lost context.</p>
            <p><strong>Metrics:</strong> time-to-info, task completion, satisfaction.</p>
          </div>
          <div className="bevel-in bg-white p-3">
            <div className="font-bold">Docs writers</div>
            <p className="mt-1"><strong>Goal:</strong> create comprehensive, maintainable docs efficiently.</p>
            <p><strong>Pain points:</strong> managing variations, maintaining consistency.</p>
            <p><strong>Metrics:</strong> authoring efficiency, maintainability, adoption.</p>
          </div>
        </div>
        <p><strong>The constraint.</strong> Any solution had to be <em>enthusiastically</em> adopted by docs writers — the authoring experience was just as critical as the reading experience.</p>
      </Section>

      <Section title="The Nested Tabs Nightmare">
        <div className="grid md:grid-cols-2 gap-3">
          <div className="bevel-in bg-white p-3">
            <div className="font-bold">User experience issues</div>
            <ul className="list-disc pl-5 mt-1">
              <li>Lost context when switching tabs</li>
              <li>Repeated selection fatigue</li>
              <li>Hard to bookmark or share configurations</li>
              <li>Mobile experience was particularly poor</li>
            </ul>
          </div>
          <div className="bevel-in bg-white p-3">
            <div className="font-bold">Technical limitations</div>
            <ul className="list-disc pl-5 mt-1">
              <li>LLMs struggled to parse nested structures</li>
              <li>Search engines couldn't index well</li>
              <li>Analytics couldn't track paths accurately</li>
              <li>Accessibility issues with complex tabs</li>
            </ul>
          </div>
        </div>
      </Section>

      <Section title="Content Complexity Explosion">
        <p>As MongoDB's product ecosystem grew, docs needed to accommodate more variables: programming languages, deployment methods, database versions, operating systems. With 4–5 variables each having 3–8 options, some pages theoretically needed to support <strong>hundreds</strong> of content permutations.</p>
      </Section>

      <Section title="Impact &amp; Adoption">
        <ul className="list-disc pl-6">
          <li><strong>Improved SEO.</strong> Linear content structure improved indexing and discoverability.</li>
          <li><strong>Enhanced AI compatibility.</strong> LLMs can now better parse and reference MongoDB documentation.</li>
          <li><strong>Content consistency.</strong> Automated validation ensures consistent quality across permutations.</li>
        </ul>
      </Section>

      <Section title="Key Learnings">
        <p><strong>Design for your content creators.</strong> Content systems succeed or fail based on creator adoption. Investing heavily in the authoring experience was crucial.</p>
        <p><strong>Upfront choices create better experiences.</strong> Users strongly preferred making customization choices at the start rather than throughout — eliminating context switching.</p>
        <p><strong>Design for the future of content consumption.</strong> Optimizing for AI systems and search engines became essential as more users discover docs through AI assistants.</p>
      </Section>

      <div className="mt-8">
        <a href="https://www.mongodb.com/docs/atlas/atlas-search/tutorial/partial-match/?deployment-type=atlas&language-atlas-only-2=atlas-ui&interface=atlas-ui" target="_blank" rel="noreferrer"
           className="bevel-button px-3 py-1 text-[13px]">Go check it out! →</a>
      </div>
    </article>
  );
}
