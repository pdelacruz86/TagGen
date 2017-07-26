<template>
	<div class="col-md-12">
		<div class="col-md-2">
			
		</div>
		<div class="col-md-6">
			<div class="portlet light ">
				<div class="portlet-title">
					<div class="caption">
						<i class="icon-social-dribbble font-blue-sharp"></i>
						<span class="caption-subject font-blue-sharp bold uppercase">Portable Tag Info</span>
					</div>
				</div>
				<div class="portlet-body form">
					<form role="form">
						<div class="form-body">
							<div class="form-group">
								<label>File Name</label>
								<input type="text" class="form-control" placeholder="My Celtra Tag" v-model="tagName"> 
							</div>
							<div class="form-group">
								<label>Fallback image Name</label>
								<input type="text" id="fallBackImageName" class="form-control" placeholder="kitten.jpeg" v-model="fallBackImageName"> 
							</div>
							<div class="form-group">
								<label>Please insert the Celtra Tag here : </label>
								<textarea rows="5" cols="75" id="input" class="form-control" placeholder="Place your Celtra tag here" v-model="html"></textarea>
							</div>
						</div>
						<div class="form-actions right">
							<button type="button" class="btn default" @click="clear" >Clear</button>
							<button type="button" class="btn green" @click="createTag">Create Tag</button>
						</div>
						<div class="form-group">
							<label>code to apn: </label>
							<textarea rows="10" cols="75" class="form-control" id="output" v-model="newHtmlForAppNexus"></textarea>
						</div>
					</form>
				</div>
			</div>
		</div>
		<div class="col-md-4">
			<div>
				<file-select :username="folderName"></file-select>
			</div>
		</div>
	</div>
</template>

<script>
	/* eslint-disable */
	import FileSelect from './taglist.vue'
	var specialSauce = require('../../utils/specialSauce.js')

	var S3Upload = require('../../utils/S3Upload.js')
	var _ = require('lodash')

	var objList = [];
	S3Upload.listTags(function (err, data) {
		if (err) {
			console.log('ERROR: ' + err);
		} else {
			var objKeys = "";
			data.Contents.forEach(function (obj) {
				objList.push(obj.Key);
			});
		}
	})

	var html = S3Upload.viewTagsFolder('user1');


	
	export default {
		name: 'Portable',
		components: {
			FileSelect
		},
		data () {
			return {
				folderName: 'user1',
				tagName: '',
				html: '',
				htmlString: '',
				APIRootURL: 'https://s3.amazonaws.com/alltags/user1/index2.js?',
				JSFileURL: 'https://s3.amazonaws.com/alltags/user1/index2.js?',
				APIqueryStrings: '', 
				APITestUrl: '',
				file: null,
				fallBackImageName: ''
			}
		},
		methods: {
			createTag(){
				var self = this;
				//get all variables from tag
				// var tagstring = this.html.toString();

				// //add special sauce lol
				// var fallBackImageUrl = (this.fallBackImageUrl === '') ? document.getElementById("fallBackImageUrl").placeholder : this.fallBackImageUrl;
				// var fallBackExitUrl = (this.fallBackExitUrl === '') ? document.getElementById("fallBackExitUrl").placeholder : this.fallBackExitUrl;

				// var result = specialSauce.ssCeltraTag(tagstring, fallBackImageUrl, fallBackExitUrl);

				// this.html = result;

				// var macros = this.html.toString().match(/.([%%])\w+%%|.([${}])\w+.|..([$!{}])\w+.|(XX\w...............XX)/g);
				var macros = this.html.toString().match(/.([%%])\w+%%|(\${([A-Za-z0-9])\w+.)+|(\$!{([A-Za-z0-9])\w+.)+|(XX\w...............XX)/g);

				//add all variables as querystring to the portableTag
				var querystring = "";

				macros.forEach( function( macro, i ) {

					var keyword = macro.match(/([A-Z|a-z])\w+/g);
				 
					if( keyword.length > 0 ) {
				    querystring += ( ( i != 0 ) ? '&' : '' ) + keyword[0] + '=' + macro;
				  }
				 
				} );
				
				debugger;
				querystring += "&fallBackImageName=" + ((this.fallBackImageName === '') ? 'kitten.jpeg' : this.fallBackImageName);

				this.APIqueryStrings = querystring;

				// //display the new tag
				// //create the folder if the folder does not exists
				// S3Upload.createTagFolder(this.folderName, function(err, data) {
				// 	if (err) {
				// 		return alert('There was an error creating your Tag: ' + err.message);
				// 	}
				// 	alert('Successfully created Tag.');
				// 	var tags = S3Upload.viewTagsFolder(self.folderName);
				// })

	  	// 	 //add tag html
	  	// 	 S3Upload.addTag(this.folderName, this.tagName, this.html, function(err, data) {
	  	// 	 	if (err) {
	  	// 	 		return alert('There was an error uploading your tag: ', err.message);
	  	// 	 	}
	  	// 	 	alert('Successfully uploaded tag.');
	  	// 	 	var tags = S3Upload.viewTagsFolder(self.folderName);
	  	// 	 })
		  },
		  clear(){
		  	this.tagName = "";
		  	this.html = "";
		  }
		},
		computed: {
    	// a computed getter
    	APIFullURL: function () {
      	// `this` points to the vm instance
      	return this.APIRootURL + this.folderName + '/' + this.tagName + '?' + this.APIqueryStrings
      },
      newHtmlForAppNexus: function(){
      	// var container = '<div class="container"><script src="APIFullURL"/> </div>'

      var container = "<div class='padsquad-tag'>"
        + "<img style='display:none' src=\"data:image/png,celtra\" onerror=\"(function(img) {"
        +  "var scrpt = document.createElement('script');"
        +  "scrpt.src = 'APIFullURL';"
        +  "img.parentNode.insertBefore(scrpt, img.nextSibling);"
        +  "})(this)\"/>"
      	+  "</div>"

      	var container= _.replace(container, 'APIFullURL', this.JSFileURL + 'tagName=' + this.tagName + '&' + this.APIqueryStrings)

      	return container;
      }
    }
  }
  /* eslint-enable */
</script>
