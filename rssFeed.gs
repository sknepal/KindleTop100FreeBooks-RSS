// Created by Subigya Nepal. TheLacunaBlog.com. Twitter: @SkNepal.
function doGet() {
  var pages = ['']; // list of spreadsheets that contain the data of each Amazon listing page.
  
  var feed, rss = "";
  
  pages.forEach(function(id){
    var rssFeed  = "https://spreadsheets.google.com/feeds/list/"+ id + "/od6/public/values?alt=rss"; // fetch the rss feed of each of the spreadsheet  
    feed += parseRSS(rssFeed, rss);   // and parse it.
  });
  
  var start_rss = "<rss version='2.0'>"; // create new rss that combines all of the spreadsheet's feeds.
  start_rss += "<channel>";
  start_rss += "<title> Kindle Top 100 Free Books - TheLacunaBlog.com </title>";
  start_rss += "<description>A feed listing of the Top 100 Free Ebooks on Amazon Best Sellers (Kindle Store). Developed by @SkNepal. </description>";
  start_rss += "<link>http://www.thelacunablog.com/</link>";
  start_rss += "<language>en-us</language>";
  
  var complete_feed = start_rss + feed + "</channel></rss>";
  
  return ContentService.createTextOutput(complete_feed) // and return the combined rss.
           .setMimeType(ContentService.MimeType.RSS);    
}
 
function parseRSS(feed, rss) { // create rss content for each of the entries in the individual spreadsheet's rss.
  
  var id = Utilities.base64Encode(feed);
  var item, date, title, link, desc, guid;
  var txt = UrlFetchApp.fetch(feed).getContentText();
  var doc = Xml.parse(txt, false);  
    
  var items = doc.getElement().getElement("channel").getElements("item");  
  
  for (var i in items) {
 
    try {
      item  = items[i];
      author =  item.author.getText().split("by")[1];
      title =   item.title[1].getText();
      image = item.title[0].getText();
      cost = item.cost.getText();
      link = item.link.getText();
      rating = item.rating.getText();
      guid  = Utilities.base64Encode(link);
      
      rss += "<item>";
      rss += "<title>" + title + "</title>";
      rss += "  <link>" + link  + "</link>";
      rss += "<guid>" + guid  + "</guid>";
      rss += "<description><![CDATA[<img src='" + image + "' /> <p><b>Cost: </b>" + cost + " <p><b>Author: </b>" + author + " <p><b>Rating: </b>" + rating + " <p>]]></description>";
      rss += "</item>";
      
    } catch (e) {
      Logger.log(e);
    }
  }
  
  return rss;
}


