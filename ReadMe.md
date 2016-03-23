# RSS Feed for Top 100 Kindle Best Sellers on Amazon
This google script creates an RSS feed for [this particular page](http://www.amazon.com/Best-Sellers-Kindle-Store/zgbs/digital-text/ref=zg_bs_fvp_p_f_digital-text?_encoding=UTF8&tf=1). It is needed because I (as well as you) can stay updated with new free best selling books on Kindle.

The link for the RSS feed is: [bit.ly/kindletop100rss](http://bit.ly/kindletop100rss)

##Details
* Uses Import.io connector to scrape the Amazon Listing.
* The rssFeed.gs script parses RSS of individual spreadsheets and then combines them to create a single RSS feed.
* The scrapeAmazon.gs script makes call to import.io API in order to scrape the individual pages.
* ImportJSON by Trevor Lohrbeer (@FastFedora) is used to parse the API response which is in JSON.
* More details on the [website](http://www.thelacunablog.com/?p=9140).