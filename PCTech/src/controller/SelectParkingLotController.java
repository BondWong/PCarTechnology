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
	
	private String parkingLotId;
	
	private ParkingLot selectedParkingLot;
	private Map<String,Object> httpSession;
	private Map<String,String[]>param;
	
	public String execute() throws Exception{
		setParkingLotId(param.get("parkingLotId")[0]);
		
		boolean isInSession = false;
		ParkingLots pls = (ParkingLots)httpSession.get("parkingLots");
		isInSession = pls==null?false:true;
		
		if(!isInSession){
			return "error";
		}
		
		boolean isSpotLoaded = false;
		selectedParkingLot = pls.getParkingLot(parkingLotId);
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
		setHttpSession(session);
	}

	@Override
	public void setParameters(Map<String, String[]> parameters) {
		// TODO Auto-generated method stub
		setParam(parameters);
	}

	public void setHttpSession(Map<String,Object> httpSession) {
		this.httpSession = httpSession;
	}

	public void setParkingLotId(String parkingLotId) {
		this.parkingLotId = parkingLotId;
	}

	public void setParam(Map<String,String[]> param) {
		this.param = param;
	}
}
