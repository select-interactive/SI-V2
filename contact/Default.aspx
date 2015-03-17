<%@ Page Title="" Language="VB" MasterPageFile="~/masterpages/empty.master" AutoEventWireup="false" CodeFile="Default.aspx.vb" Inherits="contact_Default" %>

<asp:Content ID="Content1" ContentPlaceHolderID="cphMeta" Runat="Server">
    <title>Contact Us to Discuss Your Website or Web Application Needs</title>
    <meta name="description" content="Located just west of downtown Fort Worth, Select Interactive offers website design and development services to the Dallas / Fort Worth metroplex.">
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="cphHead" Runat="Server">
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="cphContent" Runat="Server">
    <div class="row cols-2">
        <div class="col col-xlarge">
            <div id="form-contact" class="form clearfix">
                <h2 class="headline headline-large">Get in Touch</h2>
                <p>Select Interactive is located just west of downtown Fort Worth off of IH-30 and University on Locke Avenue between Vickery Boulevard and the access road.</p>
                <div id="form-content">
                    <div class="row">
                        <ul id="options" class="options">
                            <li><input type="checkbox" name="contact-reason" id="cb-info" value="General Information" /><label for="cb-info" class="lbl-cb">General Information.</label></li>
                            <li><input type="checkbox" name="contact-reason" id="cb-meeting" value="Request a Meeting" /><label for="cb-meeting" class="lbl-cb">Request a Meeting.</label></li>
                            <li><input type="checkbox" name="contact-reason" id="cb-media" value="Media Realtions" /><label for="cb-media" class="lbl-cb">Media Relations.</label></li>
                        </ul>
                    </div>
                    <div class="row">
                        <label for="tb-name">Your Name:</label>
                        <input type="text" id="tb-name" class="req" />
                    </div>
                    <div class="row">
                        <label for="tb-name">Your Email Address:</label>
                        <input type="email" id="tb-email" class="req" />
                    </div>
                    <div class="row">
                        <label for="tb-phone">Your Phone #:</label>
                        <input type="tel" id="tb-phone" class="req" />
                    </div>
                    <div class="row">
                        <label for="ta-comment">What can we do for you?</label>
                        <textarea id="ta-comment" class="req"></textarea>
                    </div>
                    <div class="row">
                        <button id="btn-submit" class="btn-si-orange btn-large">Submit</button>
                    </div>
                    <div id="status" class="status span-6"></div>
                </div>
            </div>
        </div>
        <div class="col col-xsmall">
            <div class="card card-copy card-copy-base mb-gutter-2">
                <h3 class="headline text-center">Connect</h3>
                <ul class="no-style mb-gutter-2">
                    <li><i class="fa fa-left fa-phone fa-lg"></i><a href="tel:817.210.4303.">817.210.4303</a></li>
                    <li><i class="fa fa-left fa-envelope fa-lg"></i><a href="mailto:contact@select-interactive.com">contact@select-interactive.com</a></li>
                    <li><i class="fa fa-left fa-twitter fa-lg"></i><a href="https://www.twitter.com/sel_interactive" target="_blank">@Sel_Interactive</a></li>
                    <li><i class="fa fa-left fa-facebook fa-lg"></i><a href="https://www.facebook.com/pages/Select-Interactive/365668433446732" target="_blank">Like Us on Facebook</a></li>
                    <li><i class="fa fa-left fa-google-plus fa-lg"></i><a href="https://plus.google.com/106726509160059301827/about" target="_blank">Add Us to a Goolge+ Circle</a></li>
                    <li><i class="fa fa-left fa-map-marker fa-lg"></i><a href="http://g.co/maps/529t3" target="_blank">Get Directions</a></li>
                </ul>
                <h3 class="subtitle subtitle-large si-orange">Select Interactive</h3>
                <p>3343 Locke Ave.<br />Suite 107<br />Fort Worth, TX 76107</p>
            </div>
            <div class="card card-copy card-copy-base">
                <h3 class="headline text-center">Directory</h3>
                <h4 class="subtitle">Jeremy Burton</h4>
                <ul class="no-style li-mrg-small mb-gutter">
                    <li><i class="fa fa-left fa-phone fa-smaller"></i><a href="tel:817.210.4303.">817.210.4303</a></li>
                    <li><i class="fa fa-left fa-envelope fa-smaller"></i><a href="mailto:jeremy@select-interactive.com">jeremy@select-interactive.com</a></li>
                </ul>
                <h4 class="subtitle">Dan Harris</h4>
                <ul class="no-style li-mrg-small">
                    <li><i class="fa fa-left fa-phone fa-smaller"></i><a href="tel:817.810.0021.">817.810.0021</a></li>
                    <li><i class="fa fa-left fa-envelope fa-smaller"></i><a href="mailto:dan@select-interactive.com">dan@select-interactive.com</a></li>
                </ul>
                <h4 class="subtitle">Adam Nevarez</h4>
                <ul class="no-style li-mrg-small">
                    <li><i class="fa fa-left fa-phone fa-smaller"></i><a href="tel:817.210.4307.">817.210.4307</a></li>
                    <li><i class="fa fa-left fa-envelope fa-smaller"></i><a href="mailto:adam@select-interactive.com">adam@select-interactive.com</a></li>
                </ul>
            </div>
        </div>
    </div>
</asp:Content>

<asp:Content ID="Content4" ContentPlaceHolderID="cphJS" Runat="Server">
    <script defer src="//static2.select-interactive.com/js/si/build/contact.v-1.0.min.js"></script>
</asp:Content>