import React, { useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { motion, AnimatePresence, useInView, useMotionValue, useSpring } from "framer-motion";
import {
  ArrowDown, ArrowUp, ArrowUpRight, BarChart3, BrainCircuit, CheckCircle2, Code2,
  Database, Download, Github, GraduationCap, KanbanSquare, Linkedin,
  Mail, Menu, Moon, MousePointer2, Network, Search, Send, Server,
  ShieldCheck, Sparkles, Sun, Terminal, UserRound, X, Zap
} from "lucide-react";
import "./styles.css";
const nav = ["Home","About","Skills","Experience","Projects","Education","Certifications","Contact"];
const skillGroups = [
  { title:"Data & Analytics", icon:BarChart3, items:[
    ["SQL","Querying, joins & structured data","Core"],["Data Cleaning & Organization","Reliable structured-data workflows","Core"],
    ["Python","Analysis & automation","Core"],["Pandas","Data manipulation","Working Knowledge"],["NumPy","Numerical computing","Working Knowledge"],
    ["Statistics Fundamentals","Analytical foundations","Familiar"],["Excel","Analysis & reporting","Core"],["Pivot Tables","Summarization","Core"],
    ["Charts","Data presentation","Core"],["Data Validation","Accuracy & integrity","Core"]
  ]},
  { title:"Programming & Backend", icon:Server, items:[
    ["Java","Application development","Core"],["Python","Programming & analysis","Core"],["JavaScript","Web development","Core"],
    ["Spring Boot","Backend systems","Working Knowledge"],["REST APIs","Service interfaces","Working Knowledge"],["Apache Kafka","Transaction data streams","Familiar"]
  ]},
  { title:"Databases", icon:Database, items:[["H2","SQL database","Working Knowledge"],["SQL Databases","Relational data","Core"]]},
  { title:"Tools & Cloud", icon:Code2, items:[
    ["Git","Version control","Core"],["GitHub","Code collaboration","Core"],["Maven","Java builds & tests","Working Knowledge"],
    ["AWS","Cloud fundamentals","Familiar"],["Google Sheets","Data workflows","Working Knowledge"],["Microsoft Office","Productivity & reporting","Core"],["Agile/Scrum","Team delivery","Core"]
  ]}
];
const stats = [
  ["15%","Page Load Improvement"],["20%","User Engagement Improvement"],
  ["25%","Delivery Efficiency Improvement"],["30%","Debugging Time Reduction"]
];
const strengths = ["Analytical Thinking","Problem Solving","Attention to Detail","Data Accuracy","Fast Learning","Adaptability","Communication","Agile Collaboration"];
function useCounter(target, active) {
  const [value,setValue]=useState(0);
  useEffect(()=>{
    if(!active) return;
    let start=0; const end=parseInt(target);
    const timer=setInterval(()=>{ start += 1; setValue(start); if(start>=end) clearInterval(timer); }, 28);
    return ()=>clearInterval(timer);
  },[active,target]);
  return value;
}
function SectionHeading({eyebrow,title,sub}) {
  return <div className="section-heading">
    <span className="eyebrow">{eyebrow}</span>
    <h2>{title}</h2>
    {sub && <p>{sub}</p>}
  </div>
}
function AnimatedBackground() {
  const points = Array.from({length:22});
  return <div className="background" aria-hidden="true">
    <div className="grid"></div><div className="orb orb-a"></div><div className="orb orb-b"></div>
    <svg className="data-network" viewBox="0 0 900 500">
      <path d="M70 380 C210 120 300 460 450 220 S700 80 840 330" className="network-line"/>
      <path d="M110 90 C280 210 380 30 540 300 S730 430 850 130" className="network-line"/>
      {points.map((_,i)=><circle key={i} cx={60+(i*173)%800} cy={70+(i*97)%360} r="2.5" className="node"><animate attributeName="opacity" values=".15;1;.15" dur={`${2+i%4}s`} repeatCount="indefinite"/></circle>)}
    </svg>
  </div>
}
function CustomCursor() {
  const x=useMotionValue(-100), y=useMotionValue(-100);
  const sx=useSpring(x,{stiffness:500,damping:30}), sy=useSpring(y,{stiffness:500,damping:30});
  useEffect(()=>{
    const move=e=>{x.set(e.clientX);y.set(e.clientY)};
    window.addEventListener("mousemove",move);
    return ()=>window.removeEventListener("mousemove",move);
  },[]);
  return <motion.div className="cursor" style={{left:sx,top:sy}}><span/></motion.div>
}
function Navbar({theme,setTheme}) {
  const [open,setOpen]=useState(false), [scrolled,setScrolled]=useState(false), [active,setActive]=useState("Home");
  useEffect(()=>{
    const onScroll=()=>{
      setScrolled(scrollY>30);
      let current="Home";
      document.querySelectorAll("section[id]").forEach(s=>{if(scrollY>=s.offsetTop-180) current=s.id});
      setActive(current.charAt(0).toUpperCase()+current.slice(1));
    };
    addEventListener("scroll",onScroll); onScroll(); return ()=>removeEventListener("scroll",onScroll);
  },[]);
  const go=id=>{document.getElementById(id.toLowerCase())?.scrollIntoView({behavior:"smooth"});setOpen(false)};
  return <header className={`navbar ${scrolled?"scrolled":""}`}>
    <button className="brand" onClick={()=>go("Home")}>AMOGHA <span>K. J</span></button>
    <nav className={open?"mobile-open":""}>{nav.map(item=><button key={item} className={active===item?"active":""} onClick={()=>go(item)}>{item}</button>)}</nav>
    <div className="nav-actions">
      <a href="https://github.com/AmoghaKJ/amogha-kj-portfolio" aria-label="GitHub"><Github size={18}/></a>
      <a href="https://linkedin.com/in/amoghakj" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={18}/></a>
      <button onClick={()=>setTheme(theme==="dark"?"light":"dark")} aria-label="Toggle theme">{theme==="dark"?<Sun size={18}/>:<Moon size={18}/>}</button>
      <button className="menu" onClick={()=>setOpen(!open)} aria-label="Menu">{open?<X/>:<Menu/>}</button>
    </div>
  </header>
}
function Hero() {
  const roles=["Data Analyst","Software Developer","Backend Developer","Data Enthusiast","Problem Solver"];
  const [i,setI]=useState(0);
  useEffect(()=>{const t=setInterval(()=>setI(v=>(v+1)%roles.length),2200);return()=>clearInterval(t)},[]);
  return <section id="home" className="hero">
    <AnimatedBackground/>
    <div className="hero-content">
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:.7}} className="status-pill"><span></span> Available for opportunities</motion.div>
      <motion.p className="hello" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.15}}>Hello, I'm</motion.p>
      <motion.h1 initial={{opacity:0,y:25}} animate={{opacity:1,y:0}} transition={{delay:.2}}>AMOGHA <em>K. J</em></motion.h1>
      <div className="role-wrap"><span>I build with </span><AnimatePresence mode="wait"><motion.strong key={roles[i]} initial={{y:18,opacity:0}} animate={{y:0,opacity:1}} exit={{y:-18,opacity:0}}>{roles[i]}</motion.strong></AnimatePresence></div>
      <motion.p className="hero-copy" initial={{opacity:0,y:15}} animate={{opacity:1,y:0}} transition={{delay:.4}}>Computer Science undergraduate passionate about turning structured data into meaningful insights and building reliable software systems.</motion.p>
      <motion.div className="cta-row" initial={{opacity:0,y:15}} animate={{opacity:1,y:0}} transition={{delay:.55}}>
        <button className="btn primary" onClick={()=>document.getElementById("projects").scrollIntoView({behavior:"smooth"})}>View My Work <ArrowDown size={17}/></button>
        <a className="btn ghost" href="/amogha-kj-portfolio/AMOGHA_KJ_MERN_Stack_Developer_Intern_Resume.pdf" download>Download Resume <Download size={17}/></a>
      </motion.div>
      <div className="connect-row"><span>Let's Connect</span><i></i><a href="https://linkedin.com/in/amoghakj" target="_blank" rel="noreferrer"><Linkedin size={18}/></a><a href="https://github.com/AmoghaKJ/amogha-kj-portfolio"><Github size={18}/></a><a href="mailto:amoghakj07@gmail.com"><Mail size={18}/></a></div>
    </div>
    <div className="scroll-hint"><MousePointer2 size={15}/> Scroll to explore</div>
  </section>
}
function About() {
  const ref=useRef(null), inView=useInView(ref,{once:true,amount:.25});
  return <section id="about" className="section about" ref={ref}>
    <SectionHeading eyebrow="01 / PROFILE" title="About Me" sub="Data thinking meets software engineering."/>
    <div className="about-grid">
      <motion.div className="profile-card" initial={{opacity:0,x:-30}} whileInView={{opacity:1,x:0}} viewport={{once:true}}>
        <div className="profile-ring"><div className="profile-placeholder"><UserRound size={64}/><small>[Profile Image]</small></div></div>
        <div className="profile-code"><span>const</span> focus = <b>"data → code → solutions"</b>;</div>
      </motion.div>
      <motion.div className="about-copy">
        <p>Computer Science undergraduate with hands-on experience in SQL, data validation, backend systems, and web development. Comfortable collecting, cleaning, querying, and working with structured data while building reliable application features. I enjoy solving problems through data-driven analysis and developing efficient software solutions.</p>
        <p>With experience working in Agile environments, I have contributed to application performance improvements, data validation, debugging, and full-stack development.</p>
        <div className="stats-grid">{stats.map(([n,l])=><Stat key={l} target={n} label={l} active={inView}/>)}</div>
      </motion.div>
    </div>
  </section>
}
function Stat({target,label,active}) { const v=useCounter(target,active); return <div className="stat"><strong>{v}%</strong><span>{label}</span></div> }
function AnalyticsWorkflow() {
  const steps=["RAW DATA","CLEAN","QUERY","ANALYZE","VISUALIZE","INSIGHT"];
  return <section className="section analytics" id="analytics">
    <SectionHeading eyebrow="02 / DATA MINDSET" title="Turning Data Into Decisions" sub="A practical workflow from messy inputs to useful insight."/>
    <div className="workflow">{steps.map((s,i)=><React.Fragment key={s}><motion.div className="workflow-step" initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*.08}}><span>{String(i+1).padStart(2,"0")}</span><b>{s}</b><div className="mini-bars"><i/><i/><i/></div></motion.div>{i<steps.length-1&&<div className="workflow-arrow">→</div>}</React.Fragment>)}</div>
    <div className="analytics-tags">{["SQL","Data Cleaning","Python","Excel","Data Validation","Data Visualization"].map((x,i)=><motion.div key={x} whileHover={{y:-7,scale:1.02}} className="data-tag"><Sparkles size={16}/>{x}<span>0{i+1}</span></motion.div>)}</div>
  </section>
}
function Skills() {
  return <section id="skills" className="section"><SectionHeading eyebrow="03 / TOOLKIT" title="Technical Arsenal" sub="Focused tools for analysis, backend systems and modern web development."/>
    <div className="skill-groups">{skillGroups.map(g=><motion.div className="skill-group glass" key={g.title} initial={{opacity:0,y:25}} whileInView={{opacity:1,y:0}} viewport={{once:true}}><div className="group-title"><g.icon/><h3>{g.title}</h3></div><div className="skill-grid">{g.items.map(([n,d,l])=><motion.div className="skill-card" key={n} whileHover={{y:-5}}><div><b>{n}</b><span>{d}</span></div><small>{l}</small></motion.div>)}</div></motion.div>)}</div>
  </section>
}
function TimelineItem({children,tag}) { return <motion.div className="timeline-item" initial={{opacity:0,x:-25}} whileInView={{opacity:1,x:0}} viewport={{once:true,amount:.2}}><div className="timeline-dot"></div><div className="timeline-card">{tag&&<span className="tag">{tag}</span>}{children}</div></motion.div> }
function Experience() {
  return <section id="experience" className="section"><SectionHeading eyebrow="04 / EXPERIENCE" title="Experience" sub="Building, debugging and improving software with a data-driven mindset."/>
    <div className="timeline">
      <TimelineItem tag="SOFTWARE DEVELOPMENT INTERN"><div className="exp-head"><div><h3>Emberquest</h3><p>Bangalore, India</p></div><span>Dec 2024 — Apr 2025</span></div><ul>
        <li>Queried and worked with SQL databases to support application features.</li><li>Worked with structured data handling and cloud-based system design.</li><li>Analyzed application usage and performance data to guide optimizations.</li><li>Reduced page load times by 15% and improved user engagement by 20%.</li><li>Built and maintained web features using React JS and JavaScript.</li><li>Collaborated in Agile teams and improved delivery efficiency by 25%.</li><li>Applied data-driven debugging practices and reduced debugging time by 30%.</li>
      </ul><div className="techs">{["SQL","React JS","JavaScript","Git","Agile"].map(x=><span key={x}>{x}</span>)}</div></TimelineItem>
      <TimelineItem tag="SOFTWARE ENGINEERING JOB SIMULATION"><div className="exp-head"><div><h3>JPMorganChase</h3><p>Forage · Remote</p></div><span>January 2026</span></div><ul>
        <li>Modeled and validated transaction data using Spring Data JPA and H2 SQL database.</li><li>Designed entities and performed balance reconciliation across relational records.</li><li>Consumed and validated high-volume transaction datasets from Apache Kafka topics.</li><li>Built RESTful endpoints for querying and returning user balance data.</li><li>Returned structured JSON responses and verified data integrity using Maven test suites.</li><li>Used debugger-driven inspection.</li>
      </ul><div className="techs">{["Spring Data JPA","H2","Apache Kafka","REST APIs","Maven","Java"].map(x=><span key={x}>{x}</span>)}</div></TimelineItem>
    </div>
    <div className="kafka-visual glass"><div className="stream-title"><Network/> TRANSACTION STREAM</div><div className="stream"><div className="stream-node">Producer</div><div className="stream-line"></div><div className="stream-node">Kafka</div><div className="stream-line"></div><div className="stream-node">REST API</div><div className="stream-line"></div><div className="stream-node">Balance</div></div></div>
  </section>
}
function Projects() {
  return <section id="projects" className="section"><SectionHeading eyebrow="05 / SELECTED WORK" title="Featured Projects" sub="Application engineering with secure data flows and responsive interfaces."/>
    <motion.article className="project-card glass" whileHover={{y:-8}} initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}}>
      <div className="project-visual"><div className="code-window"><div className="window-top"><i/><i/><i/><span>auth-service.js</span></div><pre>{`const session = authenticate(user);
if (session.valid) {
  authorize(session);
  return fetchUserData();
}`}</pre><div className="scan"></div></div><div className="floating-db"><Database size={22}/><span>secure data</span></div></div>
      <div className="project-info"><span className="tag">FULL-STACK APPLICATION</span><h3>Full-Stack Web Application with Secure Authentication</h3><p>Full-stack web application focused on secure authentication, data storage, retrieval, responsiveness, and reliable application performance.</p>
        <div className="feature-list">{["User authentication","Authorization","Data storage","Data retrieval","Performance optimization","Responsive interface","Version control"].map(x=><span key={x}><CheckCircle2 size={14}/>{x}</span>)}</div>
        <div className="techs">{["React JS","JavaScript","SQL","Git","Agile"].map(x=><span key={x}>{x}</span>)}</div>
        <div className="project-actions"><a href="#contact">View Project <ArrowUpRight size={16}/></a><a href="https://github.com/AmoghaKJ/amogha-kj-portfolio"><Github size={16}/> GitHub</a></div>
      </div>
    </motion.article>
  </section>
}
function Dashboard() {
  return <section className="section dashboard-section"><SectionHeading eyebrow="06 / PORTFOLIO DEMO" title="Data & Analytics" sub="A mock dashboard demonstrating the analysis workflow — not fabricated professional data."/>
    <div className="dashboard glass">
      <div className="dash-top"><div><span className="eyebrow">DEMO DATASET</span><h3>Transaction Quality Monitor</h3></div><span className="live-dot"><i/> Portfolio Demo</span></div>
      <div className="kpis">{[["12,480","Total Records"],["98.7%","Data Quality"],["12,318","Validated Rows"],["READY","Processing Status"]].map(([n,l])=><div className="kpi" key={l}><span>{l}</span><b>{n}</b><div className="sparkline"></div></div>)}</div>
      <div className="dash-grid"><div className="chart-panel"><div className="panel-title"><span>Records by Category</span><BarChart3 size={16}/></div><div className="bars">{[45,70,55,88,64,76,52].map((h,i)=><div key={i}><i style={{height:`${h}%`}}/><span>{["M","T","W","T","F","S","S"][i]}</span></div>)}</div></div>
      <div className="chart-panel"><div className="panel-title"><span>Validation Trend</span><span className="trend">+8.2%</span></div><svg viewBox="0 0 420 150" className="line-chart"><path d="M10 125 C55 120 60 75 100 90 S150 110 185 55 S230 70 260 35 S315 50 345 20 S385 30 410 10" /><path className="area" d="M10 125 C55 120 60 75 100 90 S150 110 185 55 S230 70 260 35 S315 50 345 20 S385 30 410 10 V150 H10Z"/></svg></div></div>
      <div className="sql-panel"><div className="panel-title"><span><Terminal size={15}/> SQL QUERY</span><span className="success">✓ executed</span></div><code><b>SELECT</b> category, <b>COUNT</b>(*) <b>AS</b> records<br/><b>FROM</b> portfolio_dataset<br/><b>GROUP BY</b> category<br/><b>ORDER BY</b> records <b>DESC</b>;</code></div>
      <div className="dataset"><div className="panel-title"><span>Dataset Preview</span><span className="quality"><CheckCircle2 size={14}/> Validated</span></div><div className="table"><span>ID</span><span>Category</span><span>Status</span><span>Quality</span><span>00128</span><span>Finance</span><span>Valid</span><span>100%</span><span>00129</span><span>Retail</span><span>Valid</span><span>98%</span><span>00130</span><span>Technology</span><span>Valid</span><span>99%</span></div></div>
      <div className="python-badge"><Code2 size={18}/> Python / Pandas</div>
    </div>
  </section>
}
function Education() {
  const data=[["B.Tech — Computer Science & Engineering","CMR University","Bengaluru, Karnataka","Expected 2028"],["Diploma — Computer Science & Engineering","DVS Polytechnic (Govt. Aided)","Shivamogga, Karnataka","Completed May 2025"],["Secondary School","Sri Ramakrishna Vidyalaya","Hosanagara, Karnataka","Completed April 2022"]];
  return <section id="education" className="section"><SectionHeading eyebrow="07 / EDUCATION" title="Education"/><div className="edu-timeline">{data.map((x,i)=><motion.div className="edu-card" key={x[0]} initial={{opacity:0,x:i%2?-25:25}} whileInView={{opacity:1,x:0}} viewport={{once:true}}><div className="edu-icon"><GraduationCap/></div><span className="edu-index">0{i+1}</span><h3>{x[0]}</h3><p>{x[1]}</p><span>{x[2]}</span><strong>{x[3]}</strong></motion.div>)}</div></section>
}
function Certifications() {
  return <section id="certifications" className="section"><SectionHeading eyebrow="08 / CREDENTIALS" title="Certifications"/><div className="cert-grid">
    {[["Introduction to Generative AI","Google"],["Fundamentals of Data Structures in C",""]].map(([a,b],i)=><motion.div className="cert-card glass" key={a} whileHover={{y:-6}} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}}><div className="cert-icon"><ShieldCheck/></div><span>0{i+1}</span><h3>{a}</h3>{b&&<p>{b}</p>}<a href="#contact">View Certificate <ArrowUpRight size={15}/></a></motion.div>)}
  </div></section>
}
function Strengths() {
  return <section className="section strengths"><SectionHeading eyebrow="09 / VALUE" title="What I Bring"/><div className="strength-grid">{strengths.map((s,i)=><motion.div className="strength" key={s} initial={{opacity:0,scale:.94}} whileInView={{opacity:1,scale:1}} viewport={{once:true}} transition={{delay:i*.04}} whileHover={{y:-5}}><span>{String(i+1).padStart(2,"0")}</span><Sparkles size={18}/><b>{s}</b></motion.div>)}</div></section>
}
function Contact() {
  const [sent,setSent]=useState(false);
  const submit=e=>{e.preventDefault();setSent(true);setTimeout(()=>setSent(false),3500)};
  return <section id="contact" className="section contact"><SectionHeading eyebrow="10 / CONTACT" title="Let's Build Something Together" sub="Have a problem that needs data, code, or both? Let's connect."/>
    <div className="contact-grid"><form className="contact-form glass" onSubmit={submit}><div className="field-row"><label>Name<input required placeholder="Your name"/></label><label>Email<input required type="email" placeholder="you@example.com"/></label></div><label>Subject<input required placeholder="What would you like to build?"/></label><label>Message<textarea required rows="6" placeholder="Tell me about it..."></textarea></label><button className="btn primary" type="submit">{sent?"Message Ready ✓":"Send Message"} <Send size={16}/></button></form>
      <div className="contact-info"><div className="contact-glow"><Zap size={42}/></div><div><span>Email</span><a href="mailto:amoghakj07@gmail.com">amoghakj07@gmail.com</a></div><div><span>Phone</span><a href="tel:+917483993797">+91 7483993797</a></div><div><span>Location</span><p>Shimoga, Karnataka, India</p></div><div><span>LinkedIn</span><a href="https://linkedin.com/in/amoghakj" target="_blank" rel="noreferrer">linkedin.com/in/amoghakj</a></div></div>
    </div>
  </section>
}
function Footer() { const go=id=>document.getElementById(id)?.scrollIntoView({behavior:"smooth"}); return <footer><div><button className="brand" onClick={()=>go("home")}>AMOGHA <span>K. J</span></button><p>Data • Code • Insights</p></div><div className="footer-links">{["home","about","skills","experience","projects","contact"].map(x=><button key={x} onClick={()=>go(x)}>{x}</button>)}</div><div className="socials"><a href="https://linkedin.com/in/amoghakj"><Linkedin/></a><a href="https://github.com/AmoghaKJ/amogha-kj-portfolio"><Github/></a><a href="mailto:amoghakj07@gmail.com"><Mail/></a></div><small>© 2026 AMOGHA K. J. All rights reserved.</small><button className="top" onClick={()=>go("home")} aria-label="Back to top"><ArrowUp/></button></footer> }
function App() {
  const [theme,setTheme]=useState(()=>localStorage.getItem("amogha-theme")||"dark");
  useEffect(()=>{document.documentElement.classList.toggle("dark",theme==="dark");localStorage.setItem("amogha-theme",theme)},[theme]);
  return <div className="app"><CustomCursor/><Navbar theme={theme} setTheme={setTheme}/><main><Hero/><About/><AnalyticsWorkflow/><Skills/><Experience/><Projects/><Dashboard/><Education/><Certifications/><Strengths/><Contact/></main><Footer/></div>
}
class ErrorBoundary extends React.Component {
  constructor(props){ super(props); this.state={error:null}; }
  static getDerivedStateFromError(error){ return {error}; }
  componentDidCatch(error, info){ console.error("Portfolio runtime error:", error, info); }
  render(){
    if(this.state.error){
      return <div style={{minHeight:"100vh",display:"grid",placeItems:"center",padding:24,fontFamily:"Inter,system-ui",background:"#06070b",color:"#fff"}}>
        <div style={{maxWidth:700}}>
          <h1 style={{fontSize:32,marginBottom:12}}>Portfolio runtime error</h1>
          <p style={{color:"#9ba6b8"}}>{this.state.error?.message || "Unknown error"}</p>
          <p style={{color:"#9ba6b8",fontSize:13}}>Open the browser console (F12 → Console) if you need the exact error.</p>
        </div>
      </div>
    }
    return this.props.children;
  }
}
createRoot(document.getElementById("root")).render(<ErrorBoundary><App/></ErrorBoundary>);
