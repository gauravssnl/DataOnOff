app.LoadPlugin( "UIExtras" );
var angle= 0;
var appName = "DataOnOff"
function OnStart()
{ 
 lay = app.CreateLayout( "Linear", "FillXY" );

 txt = app.CreateText( appName, 1.0 );
 txt.SetTextSize( 28 );
 txt.SetTextColor( "#FFFFFF" );
 txt.SetPadding( 0, 0.01, 0, 0.01 );
 txt.SetBackColor( "#1cbcff" );
 lay.AddChild( txt );
 lay.SetBackColor( "#FFFFFF" );
app.AddLayout( lay );




//Create a frame layout so we can put one image over another.
	layFrame = app.CreateLayout( "Frame", "" );	

	//Create first image.
	img = app.CreateImage( "/Sys/Img/Droid1.png", 0.4, -1 );
	layFrame.AddChild( img );
	
	//Create second image.
	img = app.CreateImage( "/Sys/Img/Hello.png", 0.4, -1 );
	img.Scale( 0.3, 0.3 );
	img.Move( 0, 0.15 );
	layFrame.AddChild( img );
	
	//Add layouts to app.	
	lay.AddChild( layFrame );
	
layM = app.CreateLayout( "Linear", "VCenter,FillXY" );
layM.SetMargins(0, 0.05, 0,0)
lay.AddChild( layM );
msg = "";
text = app.CreateText( msg, 1.0, -1, "MultiLine");
 text.SetTextSize( 20 );
 text.SetTextColor( "#111111" );
 layM.AddChild( text );
 layFam = app.CreateLayout( "Linear", "FillXY, Bottom, Right, TouchThrough" );
 uix = app.CreateUIExtras();
 fam = uix.CreateFAMenu( "[fa-bars]", "Up,LabelsLeft" );
 fam.SetMargins( 0.02, 0.01, 0.02, 0.01 );
 fam.SetLabelBackColor( "#FFFFFF" );
 fam.SetLabelTextColor( "#646464" );
 fam.SetOnOpened( fam_OnOpened );
 fam.SetOnClosed( fam_OnClosed );
 layFam.AddChild( fam );
 
 fabCheck = uix.CreateFAButton( "[fa-toggle-on]", "Mini" );
 fabCheck.SetButtonColors( "#ff0000", "#ff0000" );
 fabCheck.SetOnTouch( fab_OnCheck );
 fabCheck.SetLabel( "Start" );
 fam.AddFAButton( fabCheck );
 
 
 fabAbout = uix.CreateFAButton( "[fa-info]", "Mini" );
 fabAbout.SetButtonColors( "#fb4437", "#c33d32" );
 fabAbout.SetOnTouch( fab_OnAbout );
 fabAbout.SetLabel( "About" );
 fam.AddFAButton( fabAbout );
 
 
 fabForward = uix.CreateFAButton( "[fa-share]", "Mini" );
 fabForward.SetButtonColors( "#fbbc05", "#efb306" );
 fabForward.SetOnTouch( fab_OnMailForward );
 fabForward.SetLabel( "Forward" );
 fam.AddFAButton( fabForward );
  app.AddLayout( layFam );
  
 devText = app.CreateText( "Developer: gauravssnl");
 devText.SetTextColor( "#FF0000" );
 devText.SetTextSize( 20 );
// layM.AddChild( devText );
 layDev = app.CreateLayout( "Linear", "Vertical, Bottom, FillXY" );
 //layDev.SetMargins( 0.01, 0.05, 0.01, 0.01 );
 layDev.AddChild( devText );
 layM.AddChild( layDev );

 app.ShowPopup( "Press the list icon for menu" );
 //Start timer to rotate top image.
setInterval( "RotateImage()", 10 );
}


function RotateImage( ev )
{
	img.Rotate( angle );
	angle += 3;
}


function fam_OnOpened()
{
 //layFam.SetBackColor( "#99FFFFFF" );
}

function fam_OnClosed()
{
// layFam.SetBackColor( "#00FFFFFF" );
}

function fab_OnCheck()
{
 app.ShowPopup( "Checking Root access");
 cmd1 = "su -c whoami";
 
 cmd3 = "su -c svc data disable";
 res= app.SysExec(  cmd1 );
// alert(res);
 msg = "";
 if( res.match("root")) {
  msg = "Your phone is rooted";
 ip = app.GetIPAddress();
// alert(ip);
 if(ip != "0.0.0.0") {
 alert("Switch off WiFi & use mobile data");
 }
 else { 
 
 done = dataToggle();
 //alert(done);
 
 }
 text.SetText( msg );
 
 }
 else if(res == "Permission denied\n")  {
 msg = "Root Access Denied."
 msg  += "\n" + "Please grant Superuser Access. \nYour phone might be rooted.";
 //alert(msg);
  text.SetText( msg )
 }
 else {
 msg = "Your phone is not rooted.";
  text.SetText( msg );
 }
 

 

}

function fab_OnAbout()
{

 about();
  app.ShowPopup( "Developed by gauravssnl" );
}

function fab_OnMailForward()
{
 app.ShowPopup( "Share with friends. Sharing is caring" );
}

function dataEnable() {
cmd = "su  -c svc data enable";
app.SysExec( cmd);

}

function dataDisable() {
cmd = "su  -c svc data disable";
app.SysExec( cmd);
}

function dataToggle() {
route = app.SysExec("su -c ip route");
if(!route) {
dataEnable();
 msg += "\nData switched ON";
  
}
getLocalIP();
 dataDisable();
 msg += "\nData switched OFF";
 dataEnable();
 msg += "\nData switched ON";
 getLocalIP();
 return true;
}

function getLocalIP() {
cmd = "su -c ip route";
res = app.SysExec(cmd);
//alert(res);
ip = res.split(" ")[11];
if(ip) {
msg +=  "\nCurrent Local IP: " + ip;
}
else
getLocalIP();

}


function about()
{
	dlg = app.CreateDialog( "About" );
	layDlg = app.CreateLayout( "Linear", "Vertical,Center" );
	layDlg.SetBackGradient( "#eeeeee", "#ffffff" );
	layDlg.SetSize( 0.8, 0.5);
	dlg.AddLayout( layDlg );
	msg= "DataOnOff  App  by <a href= https://gauravssnl.wordpress.com>gauravssnl<a><br/>E-mail: <a href= mailto:gaurav.snl@gmail.com?subject=DNSChangerApp> gaurav.ssnl@gmail.com</a> <br><br/> \
	This app can be used to toggle( switch on & off Mobile Data on Android phone).<br> \
	Android has no option of toggling Mobile Data with single click. <br> \
	This App requires rooted Android Phone.<br>\
	DroidScript(JavaScript) has been used to develop this App."; 
	txt = app.CreateText( msg ,0.9, -1,"MultiLine,html,link,");
	txt.SetTextSize( 20 );
	txt.SetTextColor( "#ff0000" );
	txt.SetPadding( 0.05,0.0,0.05,0.0 );
	layDlg.AddChild( txt );
	closeBtn = 	uix.CreateFAButton( "[fa-close]", "Mini" );
  closeBtn.SetButtonColors( "#000000", "#ffff00" );
	closeBtn.SetMargins( 0.01, 0.01, 0.01, 0.01 );
	closeBtn.SetOnTouch(closeAbout);
	layDlg.AddChild( closeBtn );
	dlg.Show();
}
function closeAbout() {
dlg.Hide();
}