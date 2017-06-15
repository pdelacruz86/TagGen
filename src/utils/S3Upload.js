  /* eslint-disable */

  module.exports = (function(){
    // Import the listObjects function
    var AWS = require('aws-sdk');

    var tagBucketName = 'alltags'

    var creds = new AWS.Credentials({
      accessKeyId: 'akid', secretAccessKey: 'secret', sessionToken: 'session'
    });

    var creds = new AWS.Credentials({
      accessKeyId: 'AKIAJPCAYL7ROX3HX7YA', secretAccessKey: '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', sessionToken: null
    });

    AWS.config.update({
      region: 'us-east-1',
      credentials: creds
    })

    var bucket = new AWS.S3({
      params: {
        Bucket: tagBucketName
      }
    });

    function getHtml(template) {
      return template.join('\n');
    }

    function listTags(callback) {
      var prefix = 'user1';
      bucket.listObjects({
        Prefix: prefix
      }, callback);
    }

    function validateTagFolder(tagfoldername, callback){
      debugger;
      tagfoldername = tagfoldername.trim();
      if (!tagfoldername) {
        return alert('Tag Folder name must contain at least one non-space character.');
      }
      if (tagfoldername.indexOf('/') !== -1) {
        return alert('Tag Folder name cannot contain slashes.');
      }
      var tagKey = encodeURIComponent(tagfoldername) + '/';

      bucket.headObject({Key: tagKey}, callback)
    }

    function createTagFolder(tagfoldername, callback) {
      var tagKey = encodeURIComponent(tagfoldername) + '/';

      bucket.putObject({Key: tagKey}, callback);
    }

    function addTag(tagFolderName, tagName, tagHtml, callback) {
      debugger;
      if (!tagHtml.length) {
        return alert('Please paste the html tag to create first.');
      }

      var blob = new Blob([tagHtml]);

      var file = new File([blob], tagName);
      var fileName = tagName;
      var folderKey = encodeURIComponent(tagFolderName) + '/';

      var tagKey = folderKey + fileName;
      bucket.upload({
        Key: tagKey,
        Body: file
      }, callback);
    }

    function viewTagsFolder(tagFolderName) {
      var tagKey = encodeURIComponent(tagFolderName) + '//';
      bucket.listObjects({Prefix: tagKey}, function(err, data) {
        if (err) {
          return alert('There was an error viewing your tag: ' + err.message);
        }
        // `this` references the AWS.Response instance that represents the response
        var href = this.request.httpRequest.endpoint.href;
        var bucketUrl = href + tagBucketName + '/';

        var tags = data.Contents.map(function(tag) {
          var tagKey = photo.Key;
          var tagUrl = bucketUrl + encodeURIComponent(tagKey);
          return getHtml([
            '<span>',
            '<div>',
            '<p style="width:128px;height:128px;">' + tagUrl + '</p>',
            '</div>',
            '<div>',
            '<span onclick="deletePhoto(\'' + tagFolderName + "','" + tagKey + '\')">',
            'X',
            '</span>',
            '<span>',
            tagKey.replace(tagKey, ''),
            '</span>',
            '</div>',
            '<span>',
            ]);
        });

        var message = tags.length ?
        '<p>Click on the X to delete the photo</p>' :
        '<p>You do not have any tags in this tag. Please add tags.</p>';
        var htmlTemplate = [
        '<h2>',
        'tag: ' + tagFolderName,
        '</h2>',
        message,
        '<div>',
        getHtml(tags),
        '</div>',
        '<input id="photoupload" type="file" accept="image/*">',
        '<button id="addphoto" onclick="addPhoto(\'' + tagFolderName +'\')">',
        'Add Photo',
        '</button>',
        '<button onclick="listtags()">',
        'Back To tags',
        '</button>',      
        ]

        console.log(getHtml(htmlTemplate))

        return getHtml(htmlTemplate);
      });
    }

    return {
      listTags : function(callback){
        return listTags(callback)
      },
      validateTagFolder: function(tagname, callback){
        return validateTagFolder(tagname, callback)
      },
      createTagFolder: function(tagfoldername, callback){
        return createTagFolder(tagfoldername, callback);
      },
      viewTagsFolder: function(tagfoldername){
        return viewTagsFolder(tagfoldername);
      },
      addTag: function(tagFolderName, tagName, tagHtml, callback){
        return addTag(tagFolderName, tagName, tagHtml, callback)
      }
    }
  })()