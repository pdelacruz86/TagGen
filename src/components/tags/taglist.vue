<template>
<div class="row">
  <div class="col-md-12">
    <table class="table">
      <thead>
        <tr>
          <th>{{username}}{{ path }}</th>
          <th class="text-right">
          <button class="btn btn-default btn-xs" @click="goBack()" v-if="path !== '/'">Go Back</button>
          <button class="btn btn-default btn-xs" @click="refresh()">Refresh</button>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="file in sortedFiles">
          <td>
            <div class="file" v-if="file.type === 'file'">
              <i class="fa fa-file-o"></i>
              {{ file.name }}
            </div>
            <div class="directory" v-if="file.type === 'dir'">
              <i class="fa fa-folder-o"></i>
              <a @click="changePath(file.path)">{{ file.name }}</a>
            </div>
          </td>
          <td class="text-right">
            <a href="#" download v-if="file.type === 'file'">
              <i class="fa fa-cloud-download"></i>
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
</template>

<script>
  /* eslint-disable */
  var S3Upload = require('../../utils/S3Upload.js')

  module.exports = {
    name: 'taglist',
    data: function() {
      return {
        path: '/',
        files: []
      };
    },
    props: {
      username: {
        type: String,
        required: true
      },
      repo: {
        type: String
      }
    },
    computed: {
      fullRepoUrl: function() {
        return this.username + '/' + this.repo;
      },
      sortedFiles: function() {
        return this.files.slice(0).sort(function(a, b) {
          if (a.type !== b.type) {
            if (a.type === 'dir') {
              return -1;
            } else {
              return 1;
            }
          } else {
            if (a.name < b.name) {
              return -1;
            } else {
              return 1;
            }
          }
        });
      }
    },
    methods: {
      testdata: function(){
        console.log(this.files)
      },
      getFiles: function() {
            var objList = [];
            var self = this;
            S3Upload.listTags(function (err, data) {
              if (err) {
                console.log('ERROR: ' + err);
              } else {
                var objKeys = "";

                var newarray = [];
                data.Contents.forEach(function (obj) {
                   var isAfile = obj.Key.substr(obj.Key.length - 1) === '/' ? 'dir' : 'file';

                   var file = {
                    name: obj.Key,
                    path: obj.Key,
                    type: isAfile
                  }    
                  newarray.push(file)          
                });

                newarray.forEach(function (obj) {
                  var filename = obj.name.split('/').slice(1, 2)
                  var type = obj.type //== 'file' ? true : false

                  var file = {
                    name: filename,
                    path: filename,
                    type: type
                  }
                  
                  if (obj.name !== "") {
                    objList.push(file);
                  }
                });

                console.log(objList, this)
                self.files = objList
              }
            })
          },
          changePath: function(path) {
            this.path = '/' + path;
            this.getFiles();
          },
          goBack: function() {
            this.path = this.path.split('/').slice(0, -1).join('/');
            if (this.path === '') this.path = '/';

            this.getFiles();
          },
          refresh: function(){
            this.getFiles()
          }
        },
        watch: {
          repo: function(newVal, oldVal) {
            this.path = '/';
            this.getFiles();
          }
        },
        created: function() {
          if (this.username) this.getFiles();
        }
      };
    </script>