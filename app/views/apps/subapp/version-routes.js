const _ = require('lodash')

/**
 * routes function for this particular 'subapp'
 * @method exports
 * @param  {object} router prototyping kit's routes app
 * @param  {object} config object of data for this particular subapp
 * @return {updated router}        express router
 */
module.exports = function(router, config) {
  
	// example of a route will be used on all pages within the subapp's views 
  router.all([config.route.page, config.route.root + '**/*'], function(req,res,next){
    
		/* do stuff to all subapp app pages here */
		console.log("all pages!");
		
    next()
  
  });
	
	// you can write a route for specific pages/directories using the
	// config.route.root property. 
	// For example if you subapplication / version is in a directory 
	// called 'sprint1' then the output would be
	// /apps/sprint1/views/index
	router.all(config.route.root + 'index', function(req,res,next){
		console.log('This is the index page!')
		next()
	})

  return router
	
}