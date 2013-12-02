<%@ Page Title="" Language="VB" MasterPageFile="~/masterpages/empty.master" AutoEventWireup="false" CodeFile="Default.aspx.vb" Inherits="services_Default" %>

<asp:Content ID="Content1" ContentPlaceHolderID="cphMeta" Runat="Server">
    <title>Innovative Web Design, Website and Web Application Development</title>
    <meta name="description" content="Offering services such as web design and development, responsive web design, search engine optimization, and custom content managemet systems, Select Interactive is a full-service web development company.">
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="cphHead" Runat="Server">
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="cphContent" Runat="Server">
    <h2 class="headline headline-large">Website and Web Application Development</h2>
    <div class="row cols-2">
        <div class="col col-large">
            <h3 class="subtitle subtitle-large">Make Your Business Count.</h3>
            <p>It&rsquo;s estimated that up to 50 percent of visitors to landing pages will bail in the first eight seconds. It&rsquo;s our job to make those seconds count. How do we accomplish this for you? By creating a site that engages visitors from the very beginning &mdash; a site that&rsquo;s visually appealing, highly functional, and clearly communicates what your services are all about.</p>
            <h3 class="subtitle subtitle-large">Web Applications</h3>
            <p>Not only <em>websites</em> &ndash; we develop <strong>web applications</strong>, software that runs online in a web browser, to help businesses function better and more efficiently.</p>
            <div class="row cols-4-half text-center mb-gutter-2">
                <div class="col">
                    <span class="service service-strategy"></span>
                    <h4 class="subheading">Strategize</h4>
                    <p class="text-center text-small">Discuss Idea.<br />Product/Service Analysis.<br />Market Research.<br />Build a Strategy.</p>
                </div>
                <div class="col">
                    <span class="service service-innovate"></span>
                    <h4 class="subheading">Innovate</h4>
                    <p class="text-center text-small">Design for Audience.<br />Include Responsive Design.<br />Implement Development Strategy.<br />Test. Test. Test.</p>
                </div>
                <div class="col">
                    <span class="service service-publish"></span>
                    <h4 class="subheading">Publish</h4>
                    <p class="text-center text-small">Client Review.<br />Optimize for Speed.<br />Launch.<br />Celebrate.</p>
                </div>
                <div class="col">
                    <span class="service service-results"></span>
                    <h4 class="subheading">See Results</h4>
                    <p class="text-center text-small">Watch Progress.<br />Evaluate Feedback.<br />Review Analytics.<br />Enhance as Needed.</p>
                </div>
            </div>
            <h3 class="subtitle subtitle-large">Responsive Web Design (RWD)</h3>
            <p>Mobile phones, tablets, netbooks, e-readers, even television sets are being used to browse the web today. Your design needs to be ready to support all of these devices, it&rsquo;s no longer just a computer screen. To achieve this goal, we develop websites using the Responsive Web Design (RWD) strategy.</p>
            <p>Our RWD strategy is to make the website design adapt to the dimensions of the viewing device to allow for optimal viewing and ease-of-use. Changes to items such as navigation menus, font size, and images are just a few things taken into consideration.</p>
            <p class="mb-gutter-2">Compare how our site looks on your computer to your phone or tablet!</p>
            <h3 class="subtitle subtitle-large">Working With Us - PR Firms/Marketing &amp; Design Agencies</h3>
            <p>As a firm specialized in developing websites, we are often approached by PR/Marketing/Design agencies to implement their designs into full sites. We take pride in being extremely easy to work with and knowledgeable. We are happy and eager to share information about performance factors in design, responsive design strategies, SEO best practices, and assist in the analysis of Google Analytics and Google Webmaster Tools.</p>
            <p>A few examples of these collaborative projects include:</p>
            <ul class="no-style li-mrg-small">
                <li><a href="http://www.bbvacompassplaza.com" target="_blank">www.bbvacompassplaza.com</a></li>
                <li><a href="http://www.rosebriar.com" target="_blank">www.rosebriar.com</a></li>
                <li><a href="http://www.trammellcrowcenter.com" target="_blank">www.trammellcrowcenter.com</a></li>
                <li><a href="http://www.lenoxtowersbuckhead.com" target="_blank">www.lenoxtowersbuckhead.com</a></li>
                <li><a href="http://www.openra.com" target="_blank">www.openra.com</a></li>
                <li><a href="http://www.ahpropmgmt.com" target="_blank">www.ahpropmgmt.com</a></li>
            </ul>
        </div>
        <div class="col col-small">
            <div class="card card-copy card-copy-base mb-gutter-2">
                <h3 class="headline text-center">Search Engine Optimization (SEO)</h3>
                <div class="card-img"><img src="<%= (New SI_UTIL).getImg("services/analytics.v1.webp", "jpg")%>" alt="Select Interactive Search Engine Optimization" width="719" height="296" /></div>
                <p>In order to get your brand and product more attention, it&rsquo;s important that people can find you when they search the web -- especially people that have never heard of you. That&rsquo;s why with every website we include SEO best practices to help prospective clients discover your business online.</p>
                <p>By using both Google Analytics and Google Webmaster Tools for your website, we can monitor search traffic and content keywords. We can analyze that data, provide recommendations, and make changes to site copy, meta tags, anchor links, and page headings in order to improve your search engine results.</p>
            </div>
            <div class="card card-copy card-copy-base">
                <h3 class="headline text-center">Content Management Systems (CMS)</h3>
                <div class="card-img"><img src="<%= (New SI_UTIL).getImg("services/cms.v1.webp", "jpg")%>" alt="Content Management Systems" width="719" height="268" /></div>
                <p>Does your site need to be kept up-to-date at a moment&rsquo;s notice? We can provide you with a custom Content Management System (CMS) designed uniquely for you. No need to email content updates or call for changes. Our goal is to provide you the tools to be successful, with or without our input.</p>
                <p>We build unique administrative dashboards that give you the behind the scenes control needed to keep your site up-to-date – no code to decipher, hard to find features, or frustration here. The ability to manage your site in real time becomes as easy and intuitive as checking your email. Goodbye learning curve and hello rewarding satisfaction, the control is at your own fingertips.</p>
            </div>
        </div>
    </div>
</asp:Content>

<asp:Content ID="Content4" ContentPlaceHolderID="cphJS" Runat="Server">
</asp:Content>