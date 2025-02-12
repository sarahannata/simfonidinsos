/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package simfonilks.dinsos.service;

import jakarta.servlet.http.HttpSession;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import simfonilks.dinsos.model.Admin;
import simfonilks.dinsos.repo.AdminRepository;

/**
 *
 * @author hamam
 */
@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    private static Admin currentAdmin;

    public Optional<Admin> findByUsername(String username) {
        return adminRepository.findByUsername(username);
    }

    public boolean checkPassword(Admin admin, String password) {
        return admin.getPassword().equals(password);
    }

    public Admin saveAdmin(Admin admin) {
        return adminRepository.save(admin);
    }

    public void setCurrentAdmin(Admin admin, HttpSession session) {
        session.setAttribute("currentAdmin", admin);
    }

    public Admin getCurrentAdmin(HttpSession session) {
        // Logika untuk mendapatkan admin dari sesi
        return (Admin) session.getAttribute("currentAdmin");
    }
}
