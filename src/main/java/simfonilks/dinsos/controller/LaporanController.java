/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package simfonilks.dinsos.controller;

import jakarta.servlet.http.HttpSession;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.Year;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.apache.commons.compress.archivers.zip.ZipArchiveEntry;
import org.apache.commons.compress.archivers.zip.ZipArchiveOutputStream;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import simfonilks.dinsos.dto.LaporanDTO;
import simfonilks.dinsos.model.Laporan;
import simfonilks.dinsos.model.User;
import simfonilks.dinsos.model.enums.Periode;
import simfonilks.dinsos.service.LaporanService;
import simfonilks.dinsos.service.UserService;

/**
 *
 * @author hamam
 */
@RestController
@RequestMapping("/api/laporan")
public class LaporanController {

    @Autowired
    private LaporanService laporanService;

    @Autowired
    private UserService userService;

    @GetMapping
    public List<LaporanDTO> getAllLaporan() {
        return laporanService.getAllLaporanWithNamaLks();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Laporan> getLaporanById(@PathVariable Long id) {
        Optional<Laporan> laporan = laporanService.getLaporanById(id);
        return laporan.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping(consumes = "multipart/form-data")
    public ResponseEntity<Laporan> uploadLaporan(
            @RequestParam("file") MultipartFile file,
            @RequestParam("tahunUploadLaporan") Year tahunUploadLaporan,
            @RequestParam("periode") Periode periode,
            HttpSession session) throws IOException {
        User user = userService.getCurrentUser(session);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        Laporan laporan = new Laporan();
        laporan.setFileData(file.getBytes());
        laporan.setFileType(file.getContentType());
        laporan.setUploadDate(new Date());
        laporan.setTahunUploadLaporan(tahunUploadLaporan);
        laporan.setPeriode(periode);
        laporan.setUser(user);

        Laporan savedLaporan = laporanService.saveLaporan(laporan);
        return ResponseEntity.ok(savedLaporan);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLaporan(@PathVariable Long id) {
        laporanService.deleteLaporan(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/download/{id}")
    public ResponseEntity<byte[]> downloadLaporan(@PathVariable Long id) {
        Optional<Laporan> laporanOptional = laporanService.getLaporanById(id);
        if (laporanOptional.isPresent()) {
            Laporan laporan = laporanOptional.get();
            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(laporan.getFileType()))
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"laporan.pdf\"")
                    .body(laporan.getFileData());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/download/all")
    public ResponseEntity<byte[]> downloadAllLaporan() throws IOException {
        List<Laporan> allLaporan = laporanService.getAllLaporan();
        if (allLaporan.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        try (ZipArchiveOutputStream zipOutputStream = new ZipArchiveOutputStream(byteArrayOutputStream)) {
            for (Laporan laporan : allLaporan) {
                ZipArchiveEntry zipEntry = new ZipArchiveEntry("laporan_" + laporan.getId() + ".pdf");
                zipOutputStream.putArchiveEntry(zipEntry);
                zipOutputStream.write(laporan.getFileData());
                zipOutputStream.closeArchiveEntry();
            }
        }

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"all_laporan.zip\"")
                .body(byteArrayOutputStream.toByteArray());
    }

    @GetMapping("/search")
    public ResponseEntity<List<LaporanDTO>> searchLaporan(@RequestParam String searchTerm) {
        List<LaporanDTO> laporanList = laporanService.searchLaporan(searchTerm);
        if (laporanList.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(laporanList);
    }

    @GetMapping("/filter")
    public List<LaporanDTO> filterLaporanByPeriode(@RequestParam Periode periode) {
        List<Laporan> laporanList = laporanService.getLaporanByPeriode(periode);
        return laporanList.stream()
                .map(LaporanDTO::new)
                .collect(Collectors.toList());
    }
    
    @GetMapping("/my-reports")
    public ResponseEntity<List<LaporanDTO>> getLaporanByCurrentUser(HttpSession session) {
        List<LaporanDTO> laporanList = laporanService.getLaporanByCurrentUser(session);
        if (laporanList.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(laporanList);
    }
}
