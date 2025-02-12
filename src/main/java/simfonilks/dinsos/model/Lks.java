/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package simfonilks.dinsos.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import java.util.Date;

/**
 *
 * @author hamam
 */
@Entity
public class Lks {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String namaLks;
    private String pemilikLks;
    private String alamatLks;
    private String nomorAkteNotaris;
    
    @Temporal(TemporalType.TIMESTAMP)
    private Date tanggalAkteNotaris;
    
    private String kontakPengurus;
    private String akreditasi;
    private String jenisLks;
    private String jenisPelayanan;
    
    @Temporal(TemporalType.TIMESTAMP)
    private Date awalTandaDaftar;

    @Temporal(TemporalType.TIMESTAMP)
    private Date akhirTandaDaftar;

    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] uploadFoto;
    
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonBackReference
    private User user;

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

    public String getPemilikLks() {
        return pemilikLks;
    }

    public void setPemilikLks(String pemilikLks) {
        this.pemilikLks = pemilikLks;
    }

    public String getAlamatLks() {
        return alamatLks;
    }

    public void setAlamatLks(String alamatLks) {
        this.alamatLks = alamatLks;
    }

    public String getNomorAkteNotaris() {
        return nomorAkteNotaris;
    }

    public void setNomorAkteNotaris(String nomorAkteNotaris) {
        this.nomorAkteNotaris = nomorAkteNotaris;
    }

    public Date getTanggalAkteNotaris() {
        return tanggalAkteNotaris;
    }

    public void setTanggalAkteNotaris(Date tanggalAkteNotaris) {
        this.tanggalAkteNotaris = tanggalAkteNotaris;
    }

    public String getKontakPengurus() {
        return kontakPengurus;
    }

    public void setKontakPengurus(String kontakPengurus) {
        this.kontakPengurus = kontakPengurus;
    }

    public String getAkreditasi() {
        return akreditasi;
    }

    public void setAkreditasi(String akreditasi) {
        this.akreditasi = akreditasi;
    }

    public String getJenisLks() {
        return jenisLks;
    }

    public void setJenisLks(String jenisLks) {
        this.jenisLks = jenisLks;
    }

    public String getJenisPelayanan() {
        return jenisPelayanan;
    }

    public void setJenisPelayanan(String jenisPelayanan) {
        this.jenisPelayanan = jenisPelayanan;
    }

    public Date getAwalTandaDaftar() {
        return awalTandaDaftar;
    }

    public void setAwalTandaDaftar(Date awalTandaDaftar) {
        this.awalTandaDaftar = awalTandaDaftar;
    }

    public Date getAkhirTandaDaftar() {
        return akhirTandaDaftar;
    }

    public void setAkhirTandaDaftar(Date akhirTandaDaftar) {
        this.akhirTandaDaftar = akhirTandaDaftar;
    }

    public byte[] getUploadFoto() {
        return uploadFoto;
    }

    public void setUploadFoto(byte[] uploadFoto) {
        this.uploadFoto = uploadFoto;
    }
    
    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    // Constructors, getters, and setters

    public Lks() {}

    public Lks(String namaLks, String pemilikLks, String alamatLks, String nomorAkteNotaris, Date tanggalAkteNotaris,
               String kontakPengurus, String akreditasi, String jenisLks, String jenisPelayanan, 
               Date awalTandaDaftar, Date akhirTandaDaftar, byte[] uploadFoto, User user) {
        this.namaLks = namaLks;
        this.pemilikLks = pemilikLks;
        this.alamatLks = alamatLks;
        this.nomorAkteNotaris = nomorAkteNotaris;
        this.tanggalAkteNotaris = tanggalAkteNotaris;
        this.kontakPengurus = kontakPengurus;
        this.akreditasi = akreditasi;
        this.jenisLks = jenisLks;
        this.jenisPelayanan = jenisPelayanan;
        this.awalTandaDaftar = awalTandaDaftar;
        this.akhirTandaDaftar = akhirTandaDaftar;
        this.uploadFoto = uploadFoto;
        this.user = user;
    }  
}
