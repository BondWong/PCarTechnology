package model;

import java.util.Date;
import java.util.List;

public class ParkingLot {
	private String id;
	private String name;
	private String address;
	private Date joinTime;
	private Integer spotQuantity;
	private String architecture;
	private String client;
	private String fee;
	private String bussinessHours;
	private String facility;
	private Float longitude;
	private Float latitude;
	private String remark;
	private List<ParkingSpot> parkingSpots;
	private ParkingLotDAO parkingLotDAO;
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public Date getJoinTime() {
		return joinTime;
	}
	public void setJoinTime(Date joinTime) {
		this.joinTime = joinTime;
	}
	public Integer getSpotQuantity() {
		return spotQuantity;
	}
	public void setSpotQuantity(Integer spotQuantity) {
		this.spotQuantity = spotQuantity;
	}
	public String getArchitecture() {
		return architecture;
	}
	public void setArchitecture(String architecture) {
		this.architecture = architecture;
	}
	public String getClient() {
		return client;
	}
	public void setClient(String client) {
		this.client = client;
	}
	public String getFee() {
		return fee;
	}
	public void setFee(String fee) {
		this.fee = fee;
	}
	public String getBussinessHours() {
		return bussinessHours;
	}
	public void setBussinessHours(String bussinessHours) {
		this.bussinessHours = bussinessHours;
	}
	public String getFacility() {
		return facility;
	}
	public void setFacility(String facility) {
		this.facility = facility;
	}
	public Float getLongitude() {
		return longitude;
	}
	public void setLongitude(Float longitude) {
		this.longitude = longitude;
	}
	public Float getLatitude() {
		return latitude;
	}
	public void setLatitude(Float latitude) {
		this.latitude = latitude;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public List<ParkingSpot> getParkingSpots() {
		return parkingSpots;
	}
	public void setParkingSpots(List<ParkingSpot> parkingSpots) {
		this.parkingSpots = parkingSpots;
	}
	
	public ParkingLotDAO getParkingLotDAO() {
		return parkingLotDAO;
	}
	public void setParkingLotDAO(ParkingLotDAO parkingLotDAO) {
		this.parkingLotDAO = parkingLotDAO;
	}
	
	public boolean equals(Object other){
		if(other instanceof ParkingLot){
			ParkingLot pl = (ParkingLot)other;
			
			if(pl.getId().equals(this.getId())){
				return true;
			}
		}
		
		return false;
	}
	
	public int hashCode(){
		return getId().hashCode();
	}
	
	public boolean isSpotLoaded(){
		return !getParkingSpots().isEmpty();
	}
	
	public void load(){
		parkingLotDAO = ParkingLotDAO.createInstance();
		parkingLotDAO.load(getId(), getParkingSpots());
	}
	
}
