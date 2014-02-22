package model;

import java.util.Date;

public class ParkingSpot {
	private String id;
	private String status;
	private Date entranceTime;
	private Date departureTime;
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public Date getEntranceTime() {
		return entranceTime;
	}
	public void setEntranceTime(Date entranceTime) {
		this.entranceTime = entranceTime;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public Date getDepartureTime() {
		return departureTime;
	}
	public void setDepartureTime(Date departureTime) {
		this.departureTime = departureTime;
	}
	
	public boolean equals(Object other){
		if(other instanceof ParkingSpot){
			ParkingSpot sp = (ParkingSpot)other;
			
			if(sp.getId().equals(this.getId()))
				return true;
		}
		
		return false;
		
	}
	
	public int hashCode(){
		return getId().hashCode();
	}
	
}
