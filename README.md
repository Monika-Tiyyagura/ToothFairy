# Motion Detection Brushing System - A 21st Century Tooth Fairy

**Project Team:**
- Monika Tiyyagura (monikatiyyagura@gmail.com)
- Sainath Kanamathareddy (kps.sainath@gmail.com)

## Introduction
In the pursuit of enhancing dental hygiene through technology, our team embarked on developing an innovative solution aimed at improving brushing habits. The Motion Detection Brushing System, also known as Tooth Fairy project, leverages motion detection analysis to monitor and guide users' brushing techniques, ensuring a thorough and effective cleaning process. This project writeup outlines our journey from ideation to the development process, highlighting the challenges we encountered and the solutions we implemented.

*"Tooth Fairies bring you a gift when you lose a tooth, BUT our Tooth Fairy will make sure you won’t lose a tooth."*

## Ideation
The ideation phase began with recognizing a common problem: many individuals do not brush their teeth correctly, leading to dental health issues. Our brainstorming sessions focused on how Artificial Intelligence with data analytics could address this issue by providing real-time feedback on brushing habits. We explored various methods for analysis.

## Objectives
- Develop a user-friendly interface that encourages regular use and facilitates an engaging experience.
- Implement motion analysis to accurately track and analyze brushing movements.
- Provide real-time feedback to users to improve their brushing techniques.
- Create a scalable and adaptable system that can be further developed to incorporate additional features.

## Development Process

### Technologies (or libraries) Used:
- React: Efficient for building dynamic user interfaces.
- TensorFlow.js (Node & UI based): Utilized for integrating machine learning models for motion detection.
- PapaParse: Implemented for parsing CSV files generated from motion data.
- Chart.js: Used for visualizing brushing data and feedback.
- CSS: Employed for styling and enhancing the user interface.
- Grafana: An open-source data aggregator platform for visualization.
- Proton: A thin HTTP wrapper to collect push messages.
- SensorLogger: An open-source iOS and Android app to collect phone sensor information and stream it over HTTP.

### Implementation
We divided the project into three main modules:

1. **Data Collection & Visualization:**
   - Focused on getting user movements and ranking these movements on a scale of 1-10.
   - Utilized accelerometer data obtained through an open-source iOS and Android app called SensorLogger.
   - Explored data collection via HTTP for scalability.
   - Visualized data in real-time using Proton and Grafana.

2. **Training an AI (or ML?) model:**
   - Implemented a simple sequential model with two layers using TensorFlow.js.
   - Explored multiple configurations and settled on a model with two dense layers, using ReLU as the activation function.
   - Utilized the Adam optimizer with Mean Squared Error for efficiency.
   - Trained the model with about 100 different datasets over 10 epochs.

3. **User Interface & Provide Feedback on User Movements:**
   - Developed the frontend using React for an intuitive and interactive interface.
   - Used Papaparse for reading input data and integrated Chart.js for data visualization.
   - Incorporated TensorFlow.js to read the model and provide predictive ranks for a user’s brushing movement.
   - Designed a simple and engaging UI, displaying an overall score out of 10 and providing suggestive messages based on the score.

## Challenges and Solutions
- **Datasets:** Created datasets using opensource tools due to a small team.
- **Motion Detection Accuracy:** Improved accuracy by increasing the dataset and refining the machine learning model.
- **User Interface Design:** Iterative design and user testing helped create an engaging and informative interface.
- **Data Visualization:** Overcame challenges by using Chart.js for its versatility and ease of integration.

## Conclusion
The development of the Motion Analysis Brushing System has been a rewarding journey, demonstrating the potential of technology to make a tangible difference in everyday health routines. As novices in the Data Analytics, AI, and ML space, we have learned a lot and look forward to future developments and model improvements. Our team remains committed to innovation and the continuous improvement of dental hygiene practices through technology.

Apart from dental hygiene, this solution can be extended to any activity that involves special movement, such as walking, running, swimming, athletic sports, etc. The possibilities are endless, and we hope our project inspires others to use AI/ML models to improve day-to-day activities.
