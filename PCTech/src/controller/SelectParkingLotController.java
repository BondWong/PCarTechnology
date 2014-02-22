package controller;

import java.util.Map;

import model.ParkingLot;
import model.ParkingLots;

import org.apache.struts2.interceptor.ParameterAware;
import org.apache.struts2.interceptor.SessionAware;

import com.opensymphony.xwork2.ActionSupport;

public class SelectParkingLotController extends ActionSupport implements SessionAware,ParameterAware{

	/**
	 * 
	 */
	private static final long serialVersionUID = -4605961100140558084L;
	
	private String parkingLotName;
	
	private ParkingLot selectedParkingLot;
	private Map<String,Object> httpSession;
	private Map<String,String[]>param;
	
	public String execute() throws Exception{
		parkingLotName = param.get("parkingLotName")[0];
		
		boolean isInSession = false;
		ParkingLots pls = (ParkingLots)httpSession.get("parkingLots");
		isInSession = pls==null?false:true;
		
		if(!isInSession){
			return "error";
		}
		
		boolean isSpotLoaded = false;
		selectedParkingLot = pls.getParkingLot(parkingLotName);
		isSpotLoaded = selectedParkingLot.isSpotLoaded();
		
		if(!isSpotLoaded){
			selectedParkingLot.load();
			pls.saveParkingLot(selectedParkingLot);
			httpSession.remove("parkingLots");
			httpSession.put("parkingLots",pls);
		}
		
		return "success";
		
	}
	
	@Override
	public void setSession(Map<String, Object> session) {
		// TODO Auto-generated method stub
		httpSession = session;
	}

	@Override
	public void setParameters(Map<String, String[]> parameters) {
		// TODO Auto-generated method stub
		param = parameters;
	}
	
	public ParkingLot getSelectedParkingLot(){
		return selectedParkingLot;
	}
}
