package model;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class ParkingLot {
	private String name;
	private String address;
	private Date joinTime;
	private Integer spotQuantity;
	private String architecture;
	private String client;
	private String fee;
	private String businessHours;
	private String facility;
	private Float longitude;
	private Float latitude;
	private String remark;
	private Map<String,ParkingSpot> parkingSpots;
	private ParkingLotDAO parkingLotDAO;
	
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
	public String getBusinessHours() {
		return businessHours;
	}
	public void setBusinessHours(String businessHours) {
		this.businessHours = businessHours;
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
	
	public Map<String,ParkingSpot> getParkingSpots(){
		return parkingSpots;
	}
	
	public boolean equals(Object other){
		if(other instanceof ParkingLot){
			ParkingLot pl = (ParkingLot)other;
			
			if(pl.getName().equals(this.getName())){
				return true;
			}
		}
		
		return false;
	}
	
	public int hashCode(){
		return getName().hashCode();
	}
	
	public boolean isSpotLoaded(){
		if(parkingSpots==null||parkingSpots.isEmpty())
			return false;
		else
			return true;
	}
	
	public void load(){
		parkingLotDAO = ParkingLotDAO.createInstance();
		parkingSpots = new HashMap<String,ParkingSpot>();
		parkingLotDAO.load(getName(), parkingSpots);
	}
	
}
