<%@ Page Title="" Language="VB" MasterPageFile="~/masterpages/empty.master" AutoEventWireup="false" CodeFile="Default.aspx.vb" Inherits="_Default" %>

<asp:Content ID="Content1" ContentPlaceHolderID="cphMeta" Runat="Server">
    <title>Select Interactive - Fort Worth Website Design and Development, Web Application Development</title>
    <meta name="description" content="Developers of innovative websites and web applications located in Fort Worth, Texas.">
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="cphHead" Runat="Server">
    <link rel="Alternate" type="application/rss+xml" title="News from Select Interactive" href="http://www.select-interactive.com/feed/rssfeed.xml">
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="cphContent" Runat="Server">
    <h1 class="text-center mb-gutter-2"><img src="//static.select-interactive.com/SI_Images.ashx?file=logos/select-interactive-500w.v1.webp&fallback=png" class="dpi" alt="Select Interactive Website Development" width="500" height="151" /></h1>
    <div class="row divider cols-3-2">
        <div class="col">
            <h2 class="headline">Fast, Creative, User-Friendly Websites</h2>
            <p><strong class="si-orange">Select Interactive</strong> creates fast, creative, and user-friendly websites and web applications built with cutting-edge web technologies. We are a team of passionate developers working to produce the highest quality work with innovative development strategies.</p>
            <p><a href="/about/">Get to Know Our Team</a></p>
        </div>
        <div class="col">
            <h2 class="headline">Modern Web Development</h2>
            <p>Our goal is to help build a better web with every project, and we achieve that by using the latest web technologies and following web standards. We implement performance best practices in every website and application so your project loads and runs as fast as possible -- making the end-user happy.</p>
            <p><a href="/news/tag/building-a-better-web">We&rsquo;re Building a Better Web</a></p>
        </div>
        <div class="col">
            <h2 class="headline">Customized Content Management</h2>
            <p>We specialize in &ldquo;Making the web easy&rdquo; for you. Custom content management systems that are quick to learn and built specifically for your project needs. No additional bloated software or confusing admin options that only slow you down. Take control of your content at anytime, from anywhere.</p>
            <p><a href="/services/">Customized Just For You</a></p>
        </div>
        <div class="col">
            <h2 class="headline">Stay Mobile! -- Responsive Web Design</h2>
            <p>With the ever growing number of mobile devices, it&rsquo;s now expected to have a site that is fully functional, accessible, and FAST on all of them. To accomplish this goal, we implement site designs using Responsive Web Design (RWD) to allow site layout and content to adapt to the device dimensions and render as optimal as possible.</p>
            <p><a href="/news/tag/responsive-web-design">Driving Your Mobile Web</a></p>
        </div>
        <div class="col">
            <h2 class="headline">On the Cutting-Edge</h2>
            <p>We love pushing the boundaries of the web and finding ways to use new technologies to improve our products. Whether that&rsquo;s a faster turnaround time, improved site speed, search engine results, design strategies, and more, we&rsquo;re always searching for better solutions.</p>
            <p><a href="/news/tag/conference">How We Stay Ahead of the Game</a></p>
        </div>
        <div class="col">
            <h2 class="headline">Search Engine Optimization (SEO)</h2>
            <p>In order to get your brand and product more attention, it&rsquo;s important that people can find you when they search the web -- especially people that have never heard of you. That&rsquo;s why with every website we include SEO best practices to help prospective clients discover your business online.</p>
            <p><a href="/news/2012/08/lets-talk-seo">Improve Your SEO and Expand Your Brand</a></p>
        </div>
    </div>
    <h3 class="headline headline-large">What&rsquo;s Happening</h3>
    <asp:Literal runat="server" ID="ltrlNews" />
</asp:Content>

<asp:Content ID="Content4" ContentPlaceHolderID="cphJS" Runat="Server">
</asp:Content>