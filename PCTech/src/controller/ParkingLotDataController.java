package controller;

import java.util.Map;
import java.util.Set;

import model.ParkingLot;
import model.ParkingLots;
import model.ParkingSpot;

import org.apache.struts2.interceptor.SessionAware;

import com.opensymphony.xwork2.ActionSupport;

public class ParkingLotDataController extends ActionSupport implements SessionAware{

	/**
	 * 
	 */
	private static final long serialVersionUID = -4605961100140558084L;
	
	private String requestDataType;
	private String parkingLotID;
	
	private ParkingLot selectedParkingLot;
	private Set<ParkingSpot> selectedParkingSpots;
	private String errorMessage;
	
	private Map<String,Object> httpSession;
	
	public String execute() throws Exception{
		System.out.println("hello "+requestDataType+" "+parkingLotID);
		
		boolean isInSession = false;
		ParkingLots pls = (ParkingLots)httpSession.get("parkingLots");
		isInSession = pls==null?false:true;
		if(!isInSession){
			errorMessage = "error";
			return "error";
		}
		
		//boolean isSpotLoaded = false;
		selectedParkingLot = pls.getParkingLot(parkingLotID);
		
		/*isSpotLoaded = selectedParkingLot.isSpotLoaded();
		if(!isSpotLoaded){
			selectedParkingLot.load();
			pls.saveParkingLot(selectedParkingLot);
			httpSession.remove("parkingLots");
			httpSession.put("parkingLots",pls);
		}*/
		
		selectedParkingSpots = selectedParkingLot.fetchTakenParkingSpots();
		System.out.println(selectedParkingLot);
		System.out.println(selectedParkingSpots);
		
		return requestDataType;
		
	}
	public void setRequestDataType(String requestDataType){
		this.requestDataType = requestDataType;
	}
	
	public void setParkingLotID(String parkingLotID){
		this.parkingLotID = parkingLotID;
	}
	
	@Override
	public void setSession(Map<String, Object> session) {
		// TODO Auto-generated method stub
		httpSession = session;
	}
	
	//for json result
	public String getErrorMessage(){
		return errorMessage;
	}
	
	public Set<ParkingSpot> getSelectedParkingSpots(){
		return this.selectedParkingSpots;
	}
	
	public ParkingLot getSelectedParkingLot(){
		return this.selectedParkingLot;
	}
	
}
