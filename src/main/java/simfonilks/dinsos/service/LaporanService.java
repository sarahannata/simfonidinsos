/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package simfonilks.dinsos.service;

import jakarta.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import simfonilks.dinsos.dto.LaporanDTO;
import simfonilks.dinsos.model.Laporan;
import simfonilks.dinsos.model.User;
import simfonilks.dinsos.model.enums.Periode;
import simfonilks.dinsos.repo.LaporanRepository;

/**
 *
 * @author hamam
 */
@Service
public class LaporanService {

    @Autowired
    private LaporanRepository laporanRepository;
    
    @Autowired
    private UserService userService;

    public List<Laporan> getAllLaporan() {
        return laporanRepository.findAll();
    }

    public Optional<Laporan> getLaporanById(Long id) {
        return laporanRepository.findById(id);
    }

    public Laporan saveLaporan(Laporan laporan) {
        return laporanRepository.save(laporan);
    }

    public void deleteLaporan(Long id) {
        laporanRepository.deleteById(id);
    }

    public List<Laporan> getLaporanByPeriode(Periode periode) {
        return laporanRepository.findByPeriode(periode);
    }

    public List<Laporan> getLaporanByUsername(String username) {
        return laporanRepository.findByUserUsername(username);
    }

    public List<LaporanDTO> getAllLaporanWithNamaLks() {
        List<Laporan> laporanList = laporanRepository.findAll();
        return laporanList.stream()
                .map(LaporanDTO::new)
                .collect(Collectors.toList());
    }
    
//    public List<LaporanDTO> getLaporanByNamaLks(String namaLks) {
//        List<Laporan> laporanList = laporanRepository.findByUserLksListNamaLksContaining(namaLks);
//        return laporanList.stream()
//            .map(LaporanDTO::new)
//            .collect(Collectors.toList());
//    }
    
    public List<LaporanDTO> searchLaporan(String searchTerm) {
        List<Laporan> laporanList = laporanRepository.findByUsernameOrNamaLks(searchTerm);
        return laporanList.stream()
            .map(LaporanDTO::new)
            .collect(Collectors.toList());
    }
    
    public List<LaporanDTO> getLaporanByCurrentUser(HttpSession session) {
        User currentUser = userService.getCurrentUser(session);
        if (currentUser != null) {
            List<Laporan> laporanList = laporanRepository.findByUserUsername(currentUser.getUsername());
            return laporanList.stream()
                .map(LaporanDTO::new)
                .collect(Collectors.toList());
        }
        return new ArrayList<>();
    }
}
