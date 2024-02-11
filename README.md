Project Writeup: A 21st Century Tooth Fairy
 
Monika Tiyyagura monikatiyyagura@gmail.com
Sainath Kanamathareddy. kps.sainath@gmail.com 
Introduction
In the pursuit of enhancing dental hygiene through technology, our team embarked on developing an innovative solution aimed at improving brushing habits. The Motion Detection Brushing System also known as Tooth Fairy project was conceived with the goal of leveraging motion detection analysis to monitor and guide users' brushing techniques, ensuring a thorough and effective cleaning process. This project writeup outlines our journey from ideation to the development process, highlighting the challenges we encountered and the solutions we implemented. 
“Tooth Fairies bring you a gift when you loose a tooth, BUT our Tooth Fairy will make sure you won’t loose a tooth.”
Ideation
The ideation phase began with recognizing a common problem: many individuals do not brush their teeth correctly, leading to dental health issues. Our brainstorming sessions focused on how Artificial Intelligence with data analytics could address this issue by providing real-time feedback on brushing habits. We explored various methods on analysis.
Objectives
•	Develop a user-friendly interface that encourages regular use and facilitates an engaging experience.
•	Implement motion analysis to accurately track and analyze brushing movements.
•	Provide real-time feedback to users to improve their brushing techniques.
•	Create a scalable and adaptable system that can be further developed to incorporate additional features.
Development Process
Technologies (or libraries) Used: 
•	React: Chosen for its efficiency in building dynamic user interfaces.
•	TensorFlow.js(Node & UI based): Utilized for integrating machine learning models for motion detection.
•	PapaParse: Implemented for parsing CSV files generated from motion data.
•	Chart.js: Used for visualizing brushing data and feedback.
•	CSS: Employed for styling and enhancing the user interface.
•	Grafana: An open-source data aggregator platform for visualization
•	Proton: A thin http wrapper to collect push messages.
•	SensorLogger: An Open source ios and android based app to collect phone sensor information and stream it over http.

Implementation
We wondered how on earth this could be the first time a human could think about this problem and asked our almighty Google! to see if there are any past researches and we were right! There were few papers that were exploring this idea with recent one published as recent as 2021. This gave us enough confidence that there can be a viable solution. All of our team-mates pretty new to the AI/ML space, wanted to explore the implementation with our added flavor. We wanted to have something scrappy and get a buck out of our first AI/ML project. 
Having no idea where to start, we for sure know that we wanted to have an accelerometer or gyroscope and rushed to get it as soon as possible. Then realized that we have no idea how to use one!

An IOS and android app to our rescue: 

Having met our first road block – We came across an open source Ios and android app called sensor logger. The app lets its user log accelerometer, gyroscope, magnetometer, location Etc and have an easy interface to export this data over Http as well as export via CSV or Json files. 

Project plan: 

With the IOS app, stage for our development is set. Our idea is simple. Collect the user movements while they are brushing and provide feedback via an interface on their technique. We divided the project into 3 modules. 

#1. Data Collection & Visualization. 
#2. Training an AI (or ML?) model with the collected data.
#3.  User Interface & provide feedback on user movements.
 


#1. Data Collection & Visualization:
This track focused on getting user movements and ranking these movements on the scale of 1-10. To keep things simple, we first focused on accelerometer data. Accelerometer provides a 3D relative co-ordinate(x,y,z) to understand the brush movement in 3D space. We have used the aforementioned sensor logging app to get accelerometer information. There are two ways in which the data can be retrieved from app. Export the information as .CSV and pull information over http. We wanted to get the data over the http so that it would make a scalable end-to-end. We did get the data over http to our local machines but the data is not connected to the AI model in time. We exported the raw information over CSV file and fed it to the ML model.

Data Visualization:

The data we collected can be visualized in real time over http. We have used an opensource framework called proton to pull data over http and Grafana data analytics tool to visualize the data. Skeleton for the data visualization is provided by the app developer itself and we have made some modifications to show the accelerometer data in real time. This data can be fed to the AI model in future to train and provide more accurate suggestions to user. 

#2 Training an AI (or ML?) model:
 
To train our AI/ML model, we have gone with a simple sequential model with two layers.  Sequential models have linear stack of layers which is one of the simplest forms of neural network architecture. We have implemented two dense layers again for simplicity. We have used relu as activation function for input layer to learn non linear relationships effectively. Input layer is done with 64 units while output layer is done with one unit. 
For optimization, we have used adam optimizer for efficiency with meanSquaredError. We have iterated this model several times with other configurations as well and ended up with this configuration.  Tensorflow nodejs library is used for model training on a mac machine.

We ran the training with about 100 different data sets and over 10 epochs.

#3.  User Interface & provide feedback on user movements.
The frontend was developed using React, focusing on creating an intuitive and interactive interface. Papaparse framework was used for reading the input data. We integrated Chart.js for data visualization, allowing users to see their brushing patterns over time. We used js tensorflow library to read the model and provide predictive rank for a user’s brushing movement. We showed the overall score out of 10 and wanted the AI model to generate suggestive messages based on the score this generative AI. (The suggestive messages right now on the UI are mocked )
A table in the score card shows score for each area such as left top back, right bottom front Etc in the mouth for a user. This allows users to have an idea on which part of the mouth are not being thoroughly cleaned. Future scope can include metrics & suggestions based on these scopes for each part as well. The design was kept simple yet engaging, with a focus on accessibility to ensure wide usability.
 

Challenges and Solutions
- Datasets: With two people in the team, it was hard to create the data sets using the hardware. We hacked our way with the dataset generation using opensource tools online.
Motion Detection Accuracy: Initially, the system struggled with accurately detecting specific brushing motions. To address this, we increased our dataset and refined our machine learning model, significantly improving accuracy.
- User Interface Design: Ensuring the application was both engaging and informative required iterative design and user testing. Feedback from early users was invaluable in making interface adjustments.
- Data Visualization: Presenting data in an understandable and helpful manner was challenging. We opted for Chart.js for its versatility and ease of integration, which met our needs perfectly.
Conclusion
The development of the Motion Analysis Brushing System has been a rewarding journey, demonstrating the potential of technology to make a tangible difference in everyday health routines. Being novice to Data Analytics, AI & ML space, we have learned a lot about these in past couple of days. We look forward to future development of the project and improving our model. Large LLM models in place of the existing sequential model would definitely improve the accuracy of the outcome.  Our team remains committed to innovation and the continuous improvement of dental hygiene practices through technology. 
Apart from dental hygiene, this solution can be extended to any activity that involves special movement such as walking, running, Swimming, Athletic Sports Etc and the possibilities are endless. We are sure that someone somewhere around the earth would use AI/ML models to improve our day-to-day activities.
