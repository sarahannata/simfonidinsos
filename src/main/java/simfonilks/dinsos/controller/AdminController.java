/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package simfonilks.dinsos.controller;

import jakarta.servlet.http.HttpSession;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import simfonilks.dinsos.model.Admin;
import simfonilks.dinsos.service.AdminService;

/**
 *
 * @author hamam
 */
@RestController
@RequestMapping("/api/admins")
public class AdminController {
    
    @Autowired
    private AdminService adminService;

    @PostMapping("/login")
    public ResponseEntity<Admin> loginAdmin(@RequestBody Admin admin, HttpSession session) {
        Optional<Admin> adminOpt = adminService.findByUsername(admin.getUsername());
        if (adminOpt.isPresent() && adminService.checkPassword(adminOpt.get(), admin.getPassword())) {
            adminService.setCurrentAdmin(adminOpt.get(), session);
            return ResponseEntity.ok(adminOpt.get());
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
    
    @GetMapping("/current")
    public ResponseEntity<Admin> getCurrentAdmin(HttpSession session) {
        Admin currentAdmin = adminService.getCurrentAdmin(session);
        if (currentAdmin != null) {
            return ResponseEntity.ok(currentAdmin);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
    
    @PostMapping("/logout")
    public ResponseEntity<Void> logout(HttpSession session) {
        session.invalidate();
        return ResponseEntity.ok().build();
    }
}
