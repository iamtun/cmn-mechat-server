# BackEnd-MeChat
# Path: http://localhost:3000/api/v1/users
=======>Lấy tất cả users 
        GET: no body
        Dữ liệu gửi đi : không
        Dữ liệu trả về : Tất cả user
        {
        "status": "success",
        "results": 6,
        "data": {
                "data": [                    
                                {
                                        "_id": "6332c337a7da844e80de3530",
                                        "fullName": "Nguyễn Đức Hùng",
                                        "bio": "Sông Lam",
                                        "gender": 0,
                                        "birthday": "2022-09-27T09:32:39.869Z",
                                        "status": true,
                                        "avartarLink": null,
                                        "backgroundLink": null,
                                        "accountID": "6332c337a7da844e80de352e",
                                        "friendID": null,
                                        "__v": 0
                                },
                                {
                                        "_id": "6332c338a7da844e80de3534",
                                        "fullName": "Thu Thảo",
                                        "bio": "Sông Lam",
                                        "gender": 0,
                                        "birthday": "2022-09-27T09:32:40.048Z",
                                        "status": true,
                                        "avartarLink": null,
                                        "backgroundLink": null,
                                        "accountID": "6332c337a7da844e80de3532",
                                        "friendID": null,
                                        "__v": 0
                                }
                        ]
                }
        }


=======>Đăng nhập 
                Method: POST: /login
        
                Dữ liệu gửi đi
                        {
                                "phoneNumber":"0879276284",
                                "passWord":"123456"
                        }              
        
                Dữ liêu trả về
                        {
                                "status": "success",
                                "_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzMyYzMyZDcyYWFiNjAyMTI2NGIzMTIiLCJpYXQiOjE2NjQyNzIwMjcsImV4cCI6MTY2NDI3MjYyN30.Mc8BkKfyigtfnM6KGd4KYz9BdLm23RQMWQr86m1TvJc",
                                "data": {
                                                "_account": {
                                                "_id": "6332c32d72aab6021264b312",
                                                "phoneNumber": "0879276284",
                                                "status": true,
                                                "role": "user",
                                                "__v": 0
                                        }
                                }
                        }

                statusCode:
                        402:  Số điện thoại hoặc mật khẩu sai
                        401:  Lỗi dữ liệu nhập vào rỗng
          
          
=======>Đăng ký
                Method: POST: /signup
        
                Dữ liệu gửi đi    
                        {
                                "phoneNumber":"0879276285",
                                "passWord":"123456",
                                "fullName":"signup",
                                "gender":0,
                                "confirmPassWord":"123456"
                        }

                Dữ liệu trả về
                        {
                                "status": "success",
                                "_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzMyYzczZWUzY2E0ZGQ0NTlmYjU5NDIiLCJpYXQiOjE2NjQyNzIxOTAsImV4cCI6MTY2NDI3Mjc5MH0.XQCD9tEHYz4DbljGTAYxM7Mz_B3zQvwlKkhrBttTx3Y",
                                "data": {
                                                "_account": {
                                                "phoneNumber": "0879276285",
                                                "status": true,
                                                "role": "user",
                                                "_id": "6332c73ee3ca4dd459fb5940",
                                                "__v": 0
                                        }
                                }
                        }
  
                statusCode:
                        403: Số điện thoại đã tồn tại
                        404: Số điện thoại sai định dạng
                        405: Mật khẩu và mật khẩu nhập lại khác nhau
          
=======>Lấy user theo số điện thoại
                Method: GET:    /get-user-by-phone/:phoneNumber
          
                Dữ liệu gửi đi
                http://localhost:3000/api/v1/users/get-user-by-phone/0879276284
          
                Dữ liệu trả về
                {
                        "_id": "6332c32e72aab6021264b315",
                        "fullName": "Nguyễn Đức Huy",
                        "bio": "Sông Lam",
                        "gender": 0,
                        "birthday": "2022-09-27T09:32:30.531Z",
                        "status": true,
                        "avartarLink": null,
                        "backgroundLink": null,
                        "accountID": "6332c32d72aab6021264b312",
                        "friendID": null,
                        "__v": 0
                }               

=======>Lấy user theo id
                Method: GET:    /:userID
          
                Dữ liệu gửi đi
                http://localhost:3000/api/v1/users/6332c32e72aab6021264b315
            
                Dữ liệu trả về
                {
                        "status": "success",
                        "data": {
                                        "user": {
                                        "_id": "6332c32e72aab6021264b315",
                                        "fullName": "Nguyễn Đức Huy",
                                        "bio": "Sông Lam",
                                        "gender": 0,
                                        "birthday": "2022-09-27T09:32:30.531Z",
                                        "status": true,
                                        "avartarLink": null,
                                        "backgroundLink": null,
                                        "accountID": "6332c32d72aab6021264b312",
                                        "friendID": null,
                                        "__v": 0
                                }
                        }
                }

# Path: http://localhost:3000/api/v1/messages

=======>Thêm message
                Method: POST:   no body
      
                // Lỗi dữ liệu trống
                Dữ liệu gửi đi
                        ```json
                        todos: {
                                "content" : "",
                                "conversationID": "6332b00958f60a22169656f2",
                                "senderID" : "6332b00958f60a22169656e8"
                        } 
                        ```
                Dữ liệu trả về
                        ```json{
                        "status": "error",
                        "error": {
                                "errors": {
                                "content": {
                                        "name": "ValidatorError",
                                        "message": "Please fill content",
                                        "properties": {
                                        "message": "Please fill content",
                                        "type": "required",
                                        "path": "content",
                                        "value": ""
                                        },
                                        "kind": "required",
                                        "path": "content",
                                        "value": ""
                                }
                                },
                                "_message": "Message validation failed",
                                "statusCode": 500,
                                "status": "error",
                                "name": "ValidationError",
                                "message": "Message validation failed: content: Please fill content"
                        },
                        "message": "Message validation failed: content: Please fill content",
                        "stack": "ValidationError: Message validation failed: content: Please fill content\n    at model.Document.invalidate (D:\\MeChat\\BackEndMeChat\\BackEnd-MeChat\\node_modules\\mongoose\\lib\\document.js:3054:32)\n    at D:\\MeChat\\BackEndMeChat\\BackEnd-MeChat\\node_modules\\mongoose\\lib\\document.js:2842:17\n    at D:\\MeChat\\BackEndMeChat\\BackEnd-MeChat\\node_modules\\mongoose\\lib\\schematype.js:1349:9\n    at processTicksAndRejections (node:internal/process/task_queues:78:11)"
                        }```

                // Thêm thành công
                        Dữ liệu gửi đi
                                ```json
                                        "todo": {
                                                "content" : "Thêm tin nhắn",
                                                "conversationID": "6332b00958f60a22169656f2",
                                                "senderID" : "6332b00958f60a22169656e8"
                                        }
                                ```
                        Dữ liệu trả về
                                ```json{
                                        "_id": "6332b00958f60a22169656f2",
                                        "name": "ChatRoom",
                                        "imageLink": null,
                                        "lastMessage": null,
                                        "members": [
                                                "6332b00958f60a22169656ec",
                                                "6332b00958f60a22169656e8",
                                                "6332b00958f60a22169656f0"
                                        ],
                                        "messages": [
                                                "6332bc8ace45dc698fa24107"
                                        ],
                                        "createdBy": [
                                                "6332b00958f60a22169656e8"
                                        ],
                                        "__v": 0
                                }```

=======>Xóa message
        Method: DELETE: /delete-message/:messageId
        Dữ liệu gửi đi
                http://localhost:3000/api/v1/messages/delete-message/6332c3bfab6173b95bb1f237
                {
                "conversationID": "6332c338a7da844e80de3536",
                }
        Dữ liệu trả về
                {
                "_id": "6332c338a7da844e80de3536",
                "name": "ChatRoom",
                "imageLink": null,
                "lastMessage": null,
                "members": [
                        "6332c337a7da844e80de3530",
                        "6332c337a7da844e80de352c",
                        "6332c338a7da844e80de3534"
                ],
                "messages": [
                        "6332c3bcab6173b95bb1f22d",
                        "6332c3bdab6173b95bb1f232"
                ],
                "createdBy": [
                        "6332c337a7da844e80de352c"
                ],
                "__v": 0
        }
# Path: http://localhost:3000/api/v1/conversations
========> Lấy tất cả nhóm chát theo idUser
        Method: GET :   /:userId

        Dữ liệu gửi đi
        http://localhost:3000/api/v1/conversations/6332c337a7da844e80de3530

        Dữ liệu trả về
                {
                        "status": "success",
                        "data": {
                                "doc": [
                                {
                                        "_id": "6332c338a7da844e80de3536",
                                        "name": "ChatRoom",
                                        "imageLink": null,
                                        "lastMessage": null,
                                        "members": [
                                                "6332c337a7da844e80de3530",
                                                "6332c337a7da844e80de352c",
                                                "6332c338a7da844e80de3534"
                                        ],
                                        "messages": [
                                                "6332c3bcab6173b95bb1f22d",
                                                "6332c3bdab6173b95bb1f232"
                                        ],
                                        "createdBy": [
                                                "6332c337a7da844e80de352c"
                                        ],
                                        "__v": 0
                                }
                                ]
                        }
                }       
========> Tạo một nhóm chát mới
        Method: POST :   /create-group

        Dữ liệu gửi đi
        {
                "members":["6332c32e72aab6021264b315","6332c32e72aab6021264b319","6332c32e72aab6021264b31d"], 
                "createdBy":"6332c32e72aab6021264b31d"
        }       

        Dữ liệu trả về
        {
                "_id": "6332cc4e26d3e1366124e9a1",
                "name": null,
                "imageLink": null,
                "lastMessage": null,
                "members": [
                        "6332c32e72aab6021264b315",
                        "6332c32e72aab6021264b319",
                        "6332c32e72aab6021264b31d"
                ],
                "messages": [],
                "createdBy": [
                        "6332c32e72aab6021264b31d"
                ],
                "__v": 0
        }               
          