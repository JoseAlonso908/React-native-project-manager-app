import React, { Component } from 'react';
import { RNS3 } from 'react-native-aws3';
// import { AWS } from 'aws-sdk';

export default class Server extends Component {
  baseUrl = 'http://34.215.9.246:9000/api';

  getRequest(url) {
    return fetch(this.baseUrl + url)
      .then((response) => response.json())
      .then((responseJson) => {
       console.log(responseJson);
        return responseJson;
      })
      .catch((error) => {
        console.error(error);
        alert('no network!')
      });
  }

  postRequest(url, jsonData) {
    return fetch(this.baseUrl + url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/text',
        'parse-array': '|entryJSONList|'
      },
      body: JSON.stringify(jsonData),
    }).then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        return responseJson;
      })
      .catch((error) => {
        console.error(error);
        alert('no network!')
      });;
  }

  mediaHandle(puturi, path, mediaType, contentType) {

   



    const file = {
      // `uri` can also be a file system path (i.e. file://)
      uri: puturi,
      name: Date.now().toString() + mediaType,
      type: contentType
    }

    const options = {
      keyPrefix: path,
      bucket: "mobe-rapidux-co",
      region: "ap-south-1",
      accessKey: "AKIAI3SGKRSJBC7RMJYQ",
      secretKey: "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",
      successActionStatus: 201
    }

    var promise = new Promise((resolve, reject) => {
      RNS3.put(file, options).then(response => {
        if (response.status !== 201)
          throw new Error("Failed to upload image to S3");

        console.log("aw3",response.body);
        resolve(response.body.postResponse.location)
        /**
         * {
         *   postResponse: {
         *     bucket: "your-bucket",
         *     etag : "9f620878e06d28774406017480a59fd4",
         *     key: "uploads/image.png",
         *     location: "https://your-bucket.s3.amazonaws.com/uploads%2Fimage.png"
         *   }
         * }
         */
      }).catch(err => {
        reject(err)
      });

    });
    return promise;

  }
}