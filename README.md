# Sri-Care: Telco Customer Care System

## 📋 Project Overview

**Sri-Care** is a comprehensive Service-Oriented Architecture (SOA) based prototype for a telecommunications customer care system, developed for **Sri Tel Ltd (STL)**. This system enables customers to self-manage their telecom services through a web portal and mobile applications, following the requirements outlined in the Service-Oriented Computing assignment.

## 🎯 Key Features

### 1. **Account Management**
- Self-service account registration and creation
- Secure password recovery and reset functionality
- User authentication and session management

### 2. **Service Activation/Deactivation**
- Activate Value-Added Services (VAS) like International Roaming
- Manage Ringtone personalization
- Control data top-ups and other telecom services
- Real-time service status checking

### 3. **Billing & Payments**
- View current and historical bills
- Online payment processing via credit/debit cards
- Mock payment gateway integration
- Payment confirmation notifications

### 4. **Notification System**
- Asynchronous SMS, Email, and Push notifications
- "Best Effort" delivery for non-critical alerts
- Retry mechanism for failed notifications
- Queue-based processing to prevent system blocking

### 5. **Provisioning Integration**
- RESTful interface to telecom provisioning systems
- Mock provisioning service for demonstration
- Service activation status tracking

## 🏗️ Architecture

### **System Architecture**
```
┌─────────────────────────────────────────────────────────────┐
│                  Presentation Tier                          │
│  ┌─────────────┐  ┌─────────────┐  ┌──────────────────┐   │
│  │ Web Portal  │  │ iOS App     │  │  Android App     │   │
│  └─────────────┘  └─────────────┘  └──────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                Business Logic Tier (Facade)                 │
│                    CustomerCareService                       │
└─────────────────────────────────────────────────────────────┘
         │                  │                  │
         ▼                  ▼                  ▼
┌──────────────┐  ┌────────────────┐  ┌──────────────────┐
│Provisioning  │  │Notification    │  │Payment Processing│
│System        │  │Service         │  │                  │
└──────────────┘  └────────────────┘  └──────────────────┘
         │                  │
         ▼                  ▼
┌──────────────┐  ┌────────────────┐
│Telecom       │  │ RabbitMQ Queue │
│Network       │  │ (Message Broker)│
└──────────────┘  └────────────────┘
```

### **Technology Stack**
- Frontend: React.js, TypeScript, Tailwind CSS
- Backend: Java 11, Spring Boot 2.7.0
- Message Queue: RabbitMQ
- Build Tool: Apache Maven
- Architecture: Service-Oriented Architecture (SOA)
- Communication: RESTful APIs, JSON
- Security: Spring Security, BCrypt Password Encoding

## 🚀 Getting Started

### **Prerequisites**
- Java JDK 11 or higher
- Apache Maven 3.6+
- RabbitMQ Server
- Git (optional)

### **Installation Steps**

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd soc-assignment-sri-care
   ```

2. **Start RabbitMQ Server**
   ```bash
   # Windows
   rabbitmq-server.bat
   
   # Mac
   brew services start rabbitmq
   
   # Linux
   sudo service rabbitmq-server start
   ```

3. **Build the Project**
   ```bash
   mvn clean package
   ```

4. **Run the Application**
   ```bash
   mvn spring-boot:run
   ```

5. **Access the Application**
   - API Base URL: `http://localhost:8080/sri-care`
   - RabbitMQ Management: `http://localhost:15672` (guest/guest)

## 📚 API Documentation

### **Customer Care API (`/api/customer-care`)**

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/register` | POST | Register new user account |
| `/password/reset` | POST | Reset user password |
| `/bills/{phoneNumber}` | GET | Get bill history |
| `/services/manage` | POST | Activate/deactivate services |
| `/payment` | POST | Process payment |
| `/health` | GET | System health check |

### **Provisioning API (`/api/provisioning`)**

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/activate` | POST | Activate telecom service |
| `/deactivate` | POST | Deactivate telecom service |
| `/status/{phone}/{service}` | GET | Check service status |
| `/health` | GET | Provisioning system health |

## 🔧 Design Patterns Implemented

### 1. **Facade Pattern**
- `CustomerCareService` provides a simplified interface to complex subsystems
- Unified access point for Web Portal and Mobile Apps

### 2. **Service-Oriented Architecture**
- Loosely coupled services with well-defined interfaces
- Each service independently deployable and scalable

### 3. **Observer Pattern**
- Asynchronous notification system using publish-subscribe
- Decouples notification sending from main business logic

### 4. **Strategy Pattern**
- Different notification strategies (SMS, Email, Push)
- Easy to add new notification channels

### 5. **Repository Pattern**
- Abstract data access layer
- Mock data implementation for demonstration

## 🛡️ Security Considerations

1. **Authentication**: User credential validation
2. **Authorization**: Role-based access control (extensible)
3. **Data Protection**: Password hashing using BCrypt
4. **Input Validation**: Request parameter sanitization
5. **Secure Communication**: HTTPS-ready configuration

## 📊 Testing the System

### **Sample API Calls**

1. **Register User**
   ```bash
   curl -X POST http://localhost:8080/sri-care/api/customer-care/register \
     -H "Content-Type: application/json" \
     -d '{"username": "john_doe", "phoneNumber": "0771112222", "password": "test123"}'
   ```

2. **Activate International Roaming**
   ```bash
   curl -X POST http://localhost:8080/sri-care/api/customer-care/services/manage \
     -H "Content-Type: application/json" \
     -d '{"phoneNumber": "0771234567", "serviceType": "INTERNATIONAL_ROAMING", "action": "ACTIVATE", "amount": 1500.00}'
   ```

3. **View Bill History**
   ```bash
   curl http://localhost:8080/sri-care/api/customer-care/bills/0771234567
   ```

## 📈 Performance Considerations

### **Asynchronous Processing**
- Notification processing doesn't block main API responses
- RabbitMQ queues handle high-volume alert scenarios
- "Best Effort" delivery ensures system responsiveness

### **Scalability**
- Stateless REST APIs enable horizontal scaling
- Message queues decouple service dependencies
- Database connections can be pooled and optimized

## 🧪 Assumptions & Limitations

### **Assumptions**
1. Provisioning system provides RESTful interface
2. Payment gateway integration is via REST APIs
3. User authentication is via username/password
4. SMS/Email gateways are available for notifications

### **Current Limitations**
1. No actual SMS/Email gateway integration (mock only)
2. Basic authentication (no OAuth/JWT)
3. In-memory data storage (not persistent)
4. Limited error handling for external services

## 🔮 Future Enhancements

1. **Microservices Migration**: Split into independent microservices
2. **Containerization**: Docker and Kubernetes deployment
3. **API Gateway**: Add API gateway for routing and rate limiting
4. **Monitoring**: Integration with Prometheus and Grafana
5. **Chat Support**: Real-time chat with customer care agents
6. **Advanced Analytics**: Customer usage patterns and insights

## 📁 Project Structure

```
soc-assignment-sri-care/
├── src/main/java/com/sritel/sri_care/
│   ├── config/          # Configuration classes
│   ├── controllers/     # REST API controllers
│   ├── models/          # Data models and DTOs
│   ├── notification/    # Asynchronous notification system
│   ├── provisioning/    # Telecom provisioning interface
│   ├── services/        # Business logic services
│   └── SriCareApplication.java
├── src/main/resources/
│   └── application.properties
├── pom.xml
└── README.md
```

## 👥 Team Contribution

**Group Members:**
1. [CB Kularathne] - [SC/2020/11678]
2. [N.B Hewawickrama] - [SC/2020/11730]


**Roles & Responsibilities:**
- **Architecture Design**: [Names]
- **Backend Development**: [Names]
- **API Implementation**: [Names]
- **Testing & Documentation**: [Names]

## 📝 Assignment Requirements Coverage

✅ **Middleware Architecture**: SOA with message queue integration  
✅ **RESTful Services**: Complete API implementation  
✅ **Service Orchestration**: Business logic tier coordination  
✅ **Publish-Subscribe**: RabbitMQ for notifications  
✅ **Facade Pattern**: Unified interface for multiple clients  
✅ **Security Considerations**: Authentication and data protection  
✅ **Scalability**: Architecture supports web and mobile clients  

## 🤝 Acknowledgments

- University of Ruhuna, Department of Computer Science
- CSC 4222 - Service Oriented Computing Course
- Spring Boot and RabbitMQ open-source communities

## 📄 License

This project is developed for academic purposes as part of the CSC 4222 course requirements at the University of Ruhuna.

---

*For detailed architecture documentation, API specifications, and implementation details, please refer to the project documentation PDF submitted with this assignment.*