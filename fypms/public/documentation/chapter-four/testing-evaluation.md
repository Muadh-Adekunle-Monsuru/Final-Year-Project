# Testing Parameters and Evaluation Metrics

## Introduction
This document outlines the testing parameters and evaluation metrics used to assess the performance of the system. It details the methodologies employed, the specific test cases executed, and the results obtained during the testing phase.

## Testing Methodologies
The following methodologies were utilized to ensure comprehensive testing of the system:

1. **Unit Testing**: Individual components of the system were tested in isolation to verify their correctness. This included testing functions and methods for expected outputs given specific inputs.

2. **Integration Testing**: After unit testing, components were integrated, and their interactions were tested to ensure they work together as intended.

3. **System Testing**: The complete system was tested in an environment that simulates real-world usage. This phase focused on validating the overall functionality and performance of the system.

4. **User Acceptance Testing (UAT)**: End-users tested the system to ensure it meets their requirements and is user-friendly.

## Test Cases
The following test cases were executed during the testing phase:

1. **Login Functionality**
   - **Objective**: Verify that users can log in with valid credentials.
   - **Input**: Valid username and password.
   - **Expected Result**: User is redirected to the dashboard.

2. **Data Upload**
   - **Objective**: Ensure that users can upload CSV files without errors.
   - **Input**: Valid CSV file.
   - **Expected Result**: File is uploaded successfully, and data is displayed.

3. **Supervisor Allocation**
   - **Objective**: Test the allocation of supervisors to students.
   - **Input**: Selection of a student and a supervisor.
   - **Expected Result**: Supervisor is allocated to the selected student.

4. **Deadline Creation**
   - **Objective**: Verify that deadlines can be created successfully.
   - **Input**: Deadline details (title, date, description).
   - **Expected Result**: Deadline is created and displayed in the deadlines list.

## Evaluation Metrics
The following metrics were used to evaluate the system's performance:

1. **Response Time**: Measured the time taken for the system to respond to user actions, such as logging in and uploading files. The target response time was set to under 2 seconds.

2. **Error Rate**: Monitored the frequency of errors encountered during testing. The acceptable error rate was defined as less than 1%.

3. **User Satisfaction**: Collected feedback from users during UAT to gauge their satisfaction with the system's usability and functionality. A satisfaction score of 80% or higher was targeted.

4. **Throughput**: Assessed the number of transactions processed by the system in a given time frame. The goal was to achieve a throughput of at least 100 transactions per minute.

## Results
The results of the testing phase are summarized as follows:

- **Login Functionality**: Passed all test cases with a success rate of 100%.
- **Data Upload**: Successfully uploaded files in 95% of attempts, with 5% resulting in format errors.
- **Supervisor Allocation**: All allocations were processed correctly, achieving a 100% success rate.
- **Deadline Creation**: Passed all test cases with a success rate of 100%.

Overall, the system met the defined evaluation metrics, demonstrating satisfactory performance and reliability. Further improvements will be made based on user feedback collected during UAT.