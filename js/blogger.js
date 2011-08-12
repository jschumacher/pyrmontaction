var getLatestBlogPost = function()
{
	var feedUri = 'http://pyrmontaction.blogspot.com/feeds/posts/default';
	var bloggerService = new google.gdata.blogger.BloggerService('GoogleInc-jsguide-1.0');
	
	// Create the blogger service object
	var handleBlogFeed = function(blogFeedRoot) {
		var blogEntries = blogFeedRoot.feed.getEntries();
	  	// Get list of posts for each blog
	  	for (var i = 0, blogEntry; blogEntry = blogEntries[i]; i++){
			var postTitle = blogEntry.getTitle().getText();
		    var postURL = blogEntry.getHtmlLink().getHref();
		    var postContent = blogEntry.getContent()
			if (postContent)
				postContent = postContent.getText();
			else
				postContent = blogEntry.getSummary().getText();
	
			$("#topic").hide().html($("<h3/>").appendTo("#topic").html(postTitle));						
			$("<p/>").appendTo("#topic").html(postContent);
			$("#topic").fadeIn();
		}
	};

	var handleError = function(error) {
		$("#topic").hide().html$("<h3/>").appendTo("#topic").html("The topics are currently unavailable");			
	  	$("<p/>").appendTo("#topic").html(error.message);
		$("#topic").fadeIn();	
	};
	
	var query = new google.gdata.blogger.BlogPostQuery(feedUri);
    query.setMaxResults(1);    

	bloggerService.getBlogFeed(query, handleBlogFeed, handleError);
}

var getBlogTitles = function()
{
	var feedUri = 'http://pyrmontaction.blogspot.com/feeds/posts/default';
	var bloggerService = new google.gdata.blogger.BloggerService('GoogleInc-jsguide-1.0');
	
	var handleBlogFeed = function(blogFeedRoot) {
		var blogEntries = blogFeedRoot.feed.getEntries();
	  	// Get list of posts for each blog
	  	for (var i = 0, blogEntry; blogEntry = blogEntries[i]; i++){
			var postTitle = blogEntry.getTitle().getText();
		    var postId = blogEntry.getId();
		    var postURL = blogEntry.getSelfLink().getHref();		
		    var postContent = blogEntry.getContent()
			if (postContent)
				postContent = postContent.getText();
			else
				postContent = blogEntry.getSummary().getText();
			var link = $("<a/>").html(postTitle).attr("href", postURL).bind("click", function(e){
				var str = "( " + e.pageX + ", " + e.pageY + " )";
				getBlogEntry(e.target.href);
				return false;
			});
			$("#hot-topics").append($("<li/>").append(link));
		}
		getBlogEntry(blogEntries[0].getSelfLink().getHref());		
	};

	var handleError = function(error) {
	  	$("<h5/>").appendTo("#hot-topics").html("The topics are currently unavailable");
	  	$("<p/>").appendTo("#hot-topics").html(error.message);
	};
	
	var query = new google.gdata.blogger.BlogPostQuery(feedUri);
    query.setMaxResults(20);    
	bloggerService.getBlogFeed(query, handleBlogFeed, handleError);
}

var getBlogEntry = function(feedUri)
{
	var bloggerService = new google.gdata.blogger.BloggerService('GoogleInc-jsguide-1.0');
	$("#topic-title").fadeOut();
	$("#topic-content").fadeOut();
	var handleBlogFeed = function(blogFeedRoot) {
			var blogEntry = blogFeedRoot.entry;
			var postTitle = blogEntry.title.$t;
		   	// var postId = blogEntry.getId();
		   	// 			var postURL = blogEntry.getSelfLink().getHref();	
		    var postContent = blogEntry.content
			if (postContent)
				postContent = postContent.$t;
			else
				postContent = blogEntry.getSummary().getText();
			$("#topic-title").html(postTitle);
			$("#topic-content").html(postContent);	
			$("#topic-title").fadeIn();
			$("#topic-content").fadeIn();	
	};

	var handleError = function(error) {
	  	$("#topic-title").html("The topics are currently unavailable");
	  	$("#topic-content").html(error.message);
	};

	bloggerService.getBlogPostFeed(feedUri, handleBlogFeed, handleError);
}