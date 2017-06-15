<template>
	<div class="col-md-12">
		<div class="col-md-3">
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
								<input type="text" class="form-control" placeholder="" v-model="tagName"> 
							</div>
							<div class="form-group">
								<label>Please insert the Celtra Tag here : </label>
								<textarea rows="10" cols="75" id="input" class="form-control" placeholder="Celtra Code" v-model="html"></textarea>
							</div>
						</div>
						<div class="form-actions right">
							<button type="button" class="btn default" @click="getAppNexusCode" >Clear</button>
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
		<div class="col-md-3">
		</div>
	</div>
</template>

<script>
	/* eslint-disable */
	var S3Upload = require('../../utils/S3Upload.js')
	var _ = require('lodash')

	S3Upload.listTags(function (err, data) {
		if (err) {
			console.log('ERROR: ' + err);
		} else {
			var objKeys = "";
			data.Contents.forEach(function (obj) {
				objKeys += obj.Key + "<br>";
			});
			console.log(objKeys);
		}
	})
	
	export default {
		name: 'Portable',
		data () {
			return {
				folderName: 'user1',
				tagName: '',
				html: '',
				htmlString: '',
				APIRootURL: 'https://q7cg2e05ni.execute-api.us-east-1.amazonaws.com/staging/',
				APIqueryStrings: 'clickUrl=${CLICK_URL}&externalCreativeId=${CREATIVE_ID}&externalPlacementID=${TAG_ID}&externalSiteID=${SITE_ID}&externalSiteName=${REFERER_URL_ENC}&externalSupplierId=${PUBLISHER_ID}&externalCampaignId=${CP_ID}', 
				APITestUrl: 'https://q7cg2e05ni.execute-api.us-east-1.amazonaws.com/staging/asdf/asdf?clickUrl=www.test.com&externalCreativeId=69146847&externalPlacementID=11282894&externalSiteID=2924258&externalSiteName=www.padsquad2.com&externalSupplierId=100240&externalCampaignId=CP_ID'
			}
		},
		methods: {
			createTag(){
				var self = this;
				//					create the folder if the folder does not exists
				S3Upload.createTagFolder(this.folderName, function(err, data) {
					if (err) {
						return alert('There was an error creating your Tag: ' + err.message);
					}
					alert('Successfully created Tag.');
					var tags = S3Upload.viewTagsFolder(self.folderName);
					console.log(tags)
				})

	  		 //add tag html
	  		 S3Upload.addTag(this.folderName, this.tagName, this.html, function(err, data) {
	  		 	debugger;
	  		 	if (err) {
	  		 		return alert('There was an error uploading your tag: ', err.message);
	  		 	}
	  		 	alert('Successfully uploaded tag.');
	  		 	var tags = S3Upload.viewTagsFolder(self.folderName);
					console.log(tags)
	  		 })
			},
			getAppNexusCode(){
				debugger;
				var div = document.getElementById('output')
			    div.innerHTML = this.newHtmlForAppNexus;
			    // var decoded = div.firstChild.nodeValue;
			}
		},
		computed: {
    	// a computed getter
    	APIFullURL: function () {
      	// `this` points to the vm instance
      	return this.APIRootURL + this.folderName + '/' + this.tagName + '?' + this.APIqueryStrings
    	},
    	newHtmlForAppNexus: function(){
    		var container = '<div class="container"> <!-- externalCreativeId  = raw       ${CREATIVE_ID} --> <!-- externalPlacementId = raw       ${TAG_ID} --> <!-- externalSiteId      = raw       ${SITE_ID} --> <!-- externalSiteName    = urldecode ${REFERER_URL_ENC} --> <!-- externalSupplierId  = raw       ${PUBLISHER_ID} --> <!-- externalCampaignId  = raw       ${CP_ID} --> <script src="APIFullURL"/> </div>'

    		var container= _.replace(container, 'APIFullURL', this.APIFullURL)

    		return container;
    	}
  	}
	}
	/* eslint-enable */
</script>
