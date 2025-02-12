/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package simfonilks.dinsos.controller;

import jakarta.servlet.http.HttpSession;
import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import simfonilks.dinsos.model.Lks;
import simfonilks.dinsos.model.User;
import simfonilks.dinsos.model.Admin;
import simfonilks.dinsos.service.LksService;
import simfonilks.dinsos.service.UserService;
import simfonilks.dinsos.service.AdminService;

/**
 *
 * @author hamam
 */
@RestController
@RequestMapping("/api/lks")
public class LksController {

    @Autowired
    private LksService lksService;

    @Autowired
    private UserService userService;
    
    @Autowired
    private AdminService adminService;

    @GetMapping("/user")
    public ResponseEntity<List<Lks>> getLksByUser(HttpSession session) {
        User user = userService.getCurrentUser(session);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        List<Lks> lksList = lksService.getLksByUser(user);
        return ResponseEntity.ok(lksList);
    }

    @PostMapping(consumes = "multipart/form-data")
    public ResponseEntity<Lks> createLks(
            @RequestParam("namaLks") String namaLks,
            @RequestParam("pemilikLks") String pemilikLks,
            @RequestParam("alamatLks") String alamatLks,
            @RequestParam("nomorAkteNotaris") String nomorAkteNotaris,
            @RequestParam("tanggalAkteNotaris") @DateTimeFormat(pattern = "yyyy-MM-dd") Date tanggalAkteNotaris,
            @RequestParam("kontakPengurus") String kontakPengurus,
            @RequestParam("akreditasi") String akreditasi,
            @RequestParam("jenisLks") String jenisLks,
            @RequestParam("jenisPelayanan") String jenisPelayanan,
            @RequestParam("awalTandaDaftar") @DateTimeFormat(pattern = "yyyy-MM-dd") Date awalTandaDaftar,
            @RequestParam("akhirTandaDaftar") @DateTimeFormat(pattern = "yyyy-MM-dd") Date akhirTandaDaftar,
            @RequestParam("uploadFoto") MultipartFile uploadFoto,
            HttpSession session) throws IOException {

        User user = userService.getCurrentUser(session);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        Lks lks = new Lks(namaLks, pemilikLks, alamatLks, nomorAkteNotaris, tanggalAkteNotaris, kontakPengurus,
                akreditasi, jenisLks, jenisPelayanan, awalTandaDaftar, akhirTandaDaftar, uploadFoto.getBytes(), user);

        Lks savedLks = lksService.saveLks(lks);
        return ResponseEntity.ok(savedLks);
    }

    @GetMapping
    public ResponseEntity<List<Lks>> getAllLks() {
        List<Lks> lksList = lksService.getAllLks();
        return ResponseEntity.ok(lksList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Lks> getLksById(@PathVariable Long id, HttpSession session) {
        User user = userService.getCurrentUser(session);
        Admin admin = adminService.getCurrentAdmin(session);
        if (user == null && admin == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        Optional<Lks> lksOpt = lksService.getLksById(id);
        if (lksOpt.isPresent()) {
            Lks lks = lksOpt.get();
            if (user != null && lks.getUser().getId().equals(user.getId())) {
                return ResponseEntity.ok(lks);
            } else if (admin != null) {
                return ResponseEntity.ok(lks);
            } else {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            }
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Lks> updateLks(@PathVariable Long id,
            @RequestParam("namaLks") String namaLks,
            @RequestParam("pemilikLks") String pemilikLks,
            @RequestParam("alamatLks") String alamatLks,
            @RequestParam("nomorAkteNotaris") String nomorAkteNotaris,
            @RequestParam("tanggalAkteNotaris") @DateTimeFormat(pattern = "yyyy-MM-dd") Date tanggalAkteNotaris,
            @RequestParam("kontakPengurus") String kontakPengurus,
            @RequestParam("akreditasi") String akreditasi,
            @RequestParam("jenisLks") String jenisLks,
            @RequestParam("jenisPelayanan") String jenisPelayanan,
            @RequestParam("awalTandaDaftar") @DateTimeFormat(pattern = "yyyy-MM-dd") Date awalTandaDaftar,
            @RequestParam("akhirTandaDaftar") @DateTimeFormat(pattern = "yyyy-MM-dd") Date akhirTandaDaftar,
            @RequestParam(value = "uploadFoto", required = false) MultipartFile uploadFoto,
            HttpSession session) throws IOException {

        User user = userService.getCurrentUser(session);
        Admin admin = adminService.getCurrentAdmin(session);
        if (user == null && admin == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        Optional<Lks> lksOpt = lksService.getLksById(id);
        if (lksOpt.isPresent()) {
            Lks lks = lksOpt.get();
            if (user != null && !lks.getUser().getId().equals(user.getId()) && admin == null) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            }

            lks.setNamaLks(namaLks);
            lks.setPemilikLks(pemilikLks);
            lks.setAlamatLks(alamatLks);
            lks.setNomorAkteNotaris(nomorAkteNotaris);
            lks.setTanggalAkteNotaris(tanggalAkteNotaris);
            lks.setKontakPengurus(kontakPengurus);
            lks.setAkreditasi(akreditasi);
            lks.setJenisLks(jenisLks);
            lks.setJenisPelayanan(jenisPelayanan);
            lks.setAwalTandaDaftar(awalTandaDaftar);
            lks.setAkhirTandaDaftar(akhirTandaDaftar);
            if (uploadFoto != null && !uploadFoto.isEmpty()) {
                lks.setUploadFoto(uploadFoto.getBytes());
            }
            Lks updatedLks = lksService.saveLks(lks);
            return ResponseEntity.ok(updatedLks);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLks(@PathVariable Long id, HttpSession session) {
        User user = userService.getCurrentUser(session);
        Admin admin = adminService.getCurrentAdmin(session);
        if (user == null && admin == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        Optional<Lks> lksOpt = lksService.getLksById(id);
        if (lksOpt.isPresent()) {
            if (user != null && !lksOpt.get().getUser().getId().equals(user.getId()) && admin == null) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            }
            lksService.deleteLks(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}

