﻿<%@ Page Title="" Language="VB" MasterPageFile="~/masterpages/empty.master" AutoEventWireup="false" CodeFile="Default.aspx.vb" Inherits="about_Default" %>

<asp:Content ID="Content1" ContentPlaceHolderID="cphMeta" Runat="Server">
    <title>Fort Worth Web Developers, Building Website and Web Applications</title>
    <meta name="description" content="We are a team of passionate web developers that create websites, develop web applications, build content management systems, and provide search engine optimization.">
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="cphHead" Runat="Server">
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="cphContent" Runat="Server">
    <h2 class="headline headline-large">Passionate Web Developers Striving to Build a Better Web</h2>
    <div class="card card-copy card-only mb-gutter-2">
        <h3 class="headline">Digital Innovation is the Name of Our Game</h3>
        <p>At <strong class="si-orange">Select Interactive</strong> we create websites, develop web and mobile applications, and build custom content management systems for businesses, large or small.</p>
        <p>We love a good challenge and build our business on being industry experts on up-and-coming web trends, platforms, and applications. If you can imagine it, there&rsquo;s a good chance we can build it. Let us bring digital voice to your brand.</p>
        <p>We look forward to working with you.</p>
        <h3 class="subtitle subtitle-large">We are digital innovators &mdash; it&rsquo;s what we do, and we do it well.</h3>
    </div>
    <div class="row cols-2 divider">
        <div class="col">
            <h3 class="headline">Jeremy Burton</h3>
            <img src="<%= (New SI_UTIL).getImg("about/headshots/jeremy-burton.v1.jpg", "")%>" class="headshot" alt="Jeremy Burton" width="125" height="125" />
            <h3 class="subtitle">Partner, Lead Developer</h3>
            <p class="text-small"><i class="fa fa-left fa-phone"></i><a href="tel:817.210.4303">817.210.4303</a><br /><i class="fa fa-left fa-envelope"></i><a href="mailto:jeremy@select-interactive.com">jeremy@select-interactive.com</a></p>
            <p>Jeremy Burton is Co-Partner of Select Interactive, overseeing implementation and development for all client accounts. Jeremy is also responsible for all development and technology strategy.</p>
            <p>With over ten years of programming experience, Jeremy specializes in front-end web development and is particularly skilled in HTML, CSS, JavaScript, and jQuery. Jeremy also has a strong background in database implementation and design.</p>
            <p>Jeremy was recently selected to participate in the <a href="https://edgeconf.com/2014-sf" target="_blank">4th Edge Conference</a> in September 2014 at Adobe in San Francisco. The conference will focus on hot web topics such as performance, security, and images.</p>
            <p>In 2013, Jeremy was 1 of 200 developers world-wide selected to attend <a href="/news/2013/10/select-interactive-attends-edge-conference-nyc" target="_blank">Edge Conf 2013 - NYC</a>, a conference focusing on advanced, cutting-edge web technologies. All attendees were handpicked based on experience and skill set. After attending Edge Conf, Jeremy was then <a href="/news/2013/11/i-get-to-attend-the-first-ever-chrome-dev-summit" target="_blank">invited to attend the first ever Chrome Dev Summit</a> in Mountain View, CA.</p>
            <p>Jeremy has participated in other conferences including South by Southwest Interactive 2012 and 2013 in Austin, TX, HTML5TX 2013 in Austin, TX., and jQuery Conference 2012 in San Francisco, CA.</p>
            <p>Aside from being a developer, Jeremy is also very eager to teach and share his knowledge. He has given a <a href="/news/2012/08/lets-talk-seo" target="_blank">SEO Presentation</a> to multiple marketing agencies, including the <a href="http://www.nunezprgroup.com" target="_blank">Nunez PR Group</a>. He has also spent time coaching a team of developers web application development strategies while converting existing software into mobile web apps.</p>
            <p>Prior to launching Select Interactive, Jeremy served as Project Manager and Lead Developer of SohoPros, Inc. web applications team.</p>
        </div>
        <div class="col">
            <h3 class="headline">Dan Harris</h3>
            <h3 class="subtitle">Partner</h3>
            <p class="text-small"><i class="fa fa-left fa-phone"></i><a href="tel:817.810.0021">817.810.0021</a><br /><i class="fa fa-left fa-envelope"></i><a href="mailto:dan@select-interactive.com">dan@select-interactive.com</a></p>
            <p>Bringing over 30 years of programming experience to the team, Dan provides creative, proven ideas to solve challenging project needs. Dan has developed software solutions for a wide range of industries, including real estate, horticulture, advertising, and merchandising.</p>
            <p>With a very strong database background, Dan has proven to consistently offer innovative, successful solutions to database infrastructures and architecture.</p>
            <p>In 1995 Dan Harris founded SohoPros, Inc. as a computer technical support firm. Over the years SohoPros grew to offer a variety of services to their small business clients. Internet Access, Custom Programming, Web/Email Hosting and Web Site Development became the primary services provided. To meet the evolving demands of their clients, SohoPros began to focus more on custom web site development.</p><br />
            <h3 class="headline">Smitha Kumar</h3>
            <h3 class="subtitle">Front-End Engineer</h3>
            <p class="text-small"><i class="fa fa-left fa-phone"></i><a href="tel:817.210.4307">817.210.4307</a><br /><i class="fa fa-left fa-envelope"></i><a href="mailto:smitha@select-interactive.com">smitha@select-interactive.com</a></p>
            <p>Smitha Kumar joined the Select Interactive team in July 2014 as a front-end engineer. Her role will focus on HTML, CSS, and JavaScript development while integrating performance best practices, responsive web design strategies, and optimizations for user engagement.</p>
            <p>In May 2014 Smitha graduated with a master&rsquo;s degree in software engineering from SMU. Prior to joining Select Interactive, Smitha pursued her interest in web development as an intern in 2013 and as a web developer student assistant for the Cox School of Business at SMU. Excited to learn new things and perfect her web development skills, Smitha was a perfect fit to join the SI development team.</p>
            <p>In her free time, she likes to listen to music, dance to the tunes, and read fiction books.</p>
        </div>
    </div>
    <h3 class="headline headline-large">Who We Work With</h3>
    <div id="partners-grid">
        <a href="http://www.williamstrew.com" target="_blank"><img src="<%= (New SI_UTIL).getImg("partners/wt.v1.webp", "png")%>" class="dpi" alt="Williams Trew Sotheby's Interational Realty" width="250" height="39" /></a>
        <a href="http://www.slantpartners.com" target="_blank"><img src="<%= (New SI_UTIL).getImg("partners/slant.v1.webp", "png")%>" class="dpi" alt="Slant Partners, Design-Driven Marketing Firm" width="150" height="40" /></a>
        <a href="http://www.bluerockmarketing.net" target="_blank"><img src="<%= (New SI_UTIL).getImg("partners/blue-rock.v1.webp", "png")%>" class="dpi" alt="BlueRock Marketing" width="350" height="39" /></a>
        <a href="http://www.streamrealty.com" target="_blank"><img src="<%= (New SI_UTIL).getImg("partners/srp.v1.png", "")%>" class="dpi" alt="Stream Realty Partners Commercial Real Estate Services" width="89" height="40" /></a>
        <a href="http://www.edelweissediting.com" target="_blank"><img src="<%= (New SI_UTIL).getImg("partners/edelweiss.v1.png", "")%>" class="dbi" alt="Edelweiss Editing" width="208" height="40" /></a>
    </div>
</asp:Content>

<asp:Content ID="Content4" ContentPlaceHolderID="cphJS" Runat="Server">
</asp:Content>