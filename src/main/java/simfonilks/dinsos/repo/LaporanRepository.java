/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package simfonilks.dinsos.repo;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import simfonilks.dinsos.model.Laporan;
import simfonilks.dinsos.model.User;
import simfonilks.dinsos.model.enums.Periode;

/**
 *
 * @author hamam
 */
@Repository
public interface LaporanRepository extends JpaRepository<Laporan, Long> {
    List<Laporan> findByPeriode(Periode periode);
    List<Laporan> findByUserUsername(String username);
    List<Laporan> findByUserLksListNamaLksContaining(String namaLks); // Untuk Mencari By NamaLks
    
   @Query("SELECT l FROM Laporan l JOIN l.user u LEFT JOIN u.lksList lks WHERE u.username LIKE %:searchTerm% OR lks.namaLks LIKE %:searchTerm%")
    List<Laporan> findByUsernameOrNamaLks(@Param("searchTerm") String searchTerm);
    
    boolean existsByUserAndPeriodeAndTahunUploadLaporan(User user, Periode periode, int tahunUploadLaporan);
}
