/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package simfonilks.dinsos.service;

import jakarta.servlet.http.HttpSession;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import simfonilks.dinsos.model.User;
import simfonilks.dinsos.repo.UserRepository;

/**
 *
 * @author hamam
 */
@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

//    private static User currentUser;
    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public boolean checkPassword(User user, String password) {
        return user.getPassword().equals(password);
    }

    public User saveUser(User user) {
        user.setStatus(true); // Set default status to active
        return userRepository.save(user);
    }

    public User updateUser(Long id, User userDetails) {
        User user = userRepository.findById(id).orElse(null);
        if (user == null) {
            return null;
        }

        // Update only the fields that are provided
        if (userDetails.getUsername() != null && !userDetails.getUsername().isEmpty()) {
            user.setUsername(userDetails.getUsername());
        }
        if (userDetails.getPassword() != null && !userDetails.getPassword().isEmpty()) {
            user.setPassword(userDetails.getPassword());
        }

        return userRepository.save(user);
    }

    public boolean deleteUser(Long id) {
        User user = userRepository.findById(id).orElse(null);
        if (user == null) {
            return false;
        }
        userRepository.delete(user);
        return true;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getCurrentUser(HttpSession session) {
        return (User) session.getAttribute("currentUser");
    }

    public void setCurrentUser(User user, HttpSession session) {
        session.setAttribute("currentUser", user);
    }

    public void logout(HttpSession session) {
        session.invalidate();
    }
    
    public boolean isActive(User user) {
        return user.getStatus();
    }

    public User changeUserStatus(Long id, Boolean status) {
        User user = userRepository.findById(id).orElse(null);
        if (user == null) {
            return null;
        }
        user.setStatus(status);
        return userRepository.save(user);
    }
}
