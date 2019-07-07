# Exam Assistant

## Introduction

Exam Assistant is an Serverless Web Application which converts text to audio files which can be played through Alexa and can be used by students to generate Audio notes for Exams. It is a text to speech Application which can be used by students for exam preparation to generate audio files of their notes

`Technology used : Alexa, AWS Lambda, DynamoDB, Amazon Polly, Node JS`

### Problem Statement 

Many student including myself find it very difficult to read through mobile ( pdf ) while travelling or use mobile to learn before exams causes a lot of strain to your eyes and people with high power find it difficult, So to solve this problem this application is used to generate audio files of your exam notes and can be used while travelling or anywhere and it can be used through Amazon Alexa at your home too.
It is very helpful for the blind students or whose eyes are weak can use this application to listen to audio generated notes by their teacher

## Architecture

![Architecture](https://github.com/Ash-D23/Exam-Assistant/blob/master/Screenshots/Exam%20Assistant.jpg)

## Instructions

In AWS Goto Lambda and set up these functions : 
* getPosts - which gets all the Posts from Database with audio files link stored in S3
* createNotes - which creates a new post which updates the DB with a new document and calls another lambda function postConvert using SNS
* postConvert - it converts the text into audio file using Amazon Polly and stores it in S3 and updates the DB
* alexaExam - It handles the Alexa skill 
* Create an S3 bucket for the storage of audio files
* Create a Database in DynamoDB
* Set up the Frontend which is a simple website with a form to send get and post requests
* Connect the lambda functions with API Gateway to handle get and post requests 
* Setup Alexa Skill and connect to alexaExam Lambda Function

![Exam](https://github.com/Ash-D23/Exam-Assistant/blob/master/Screenshots/2019-03-26.png)

Demo : https://drive.google.com/open?id=18Be-U-kXXBgZf0FK7mufKLZz5zeAtjPS