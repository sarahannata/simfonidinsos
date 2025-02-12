/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package simfonilks.dinsos.dto;

import java.time.Year;
import java.util.Date;
import simfonilks.dinsos.model.Laporan;
import simfonilks.dinsos.model.enums.Periode;

/**
 *
 * @author hamam
 */
public class LaporanDTO {

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNamaLks() {
        return namaLks;
    }

    public void setNamaLks(String namaLks) {
        this.namaLks = namaLks;
    }

    public Date getUploadDate() {
        return uploadDate;
    }

    public void setUploadDate(Date uploadDate) {
        this.uploadDate = uploadDate;
    }

    public String getFileType() {
        return fileType;
    }

    public void setFileType(String fileType) {
        this.fileType = fileType;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
    private Long id;
    private String namaLks;
    private Date uploadDate;
    private String fileType;
    private Long userId;

    public Periode getPeriode() {
        return periode;
    }

    public void setPeriode(Periode periode) {
        this.periode = periode;
    }

    public Year getTahunUploadLaporan() {
        return tahunUploadLaporan;
    }

    public void setTahunUploadLaporan(Year tahunUploadLaporan) {
        this.tahunUploadLaporan = tahunUploadLaporan;
    }
    private Periode periode;
    private Year tahunUploadLaporan;

    // Constructors, getters, and setters
    public LaporanDTO(Laporan laporan) {
        this.id = laporan.getId();
        this.uploadDate = laporan.getUploadDate();
        this.fileType = laporan.getFileType();
        this.userId = laporan.getUser().getId();
        this.periode = laporan.getPeriode();
        this.tahunUploadLaporan = laporan.getTahunUploadLaporan();
        if (!laporan.getUser().getLksList().isEmpty()) {
            this.namaLks = laporan.getUser().getLksList().get(0).getNamaLks();
        } else {
            this.namaLks = "N/A";
        }
    }

    // Getters and setters
}
