package test;

import model.ParkingLot;
import junit.framework.TestCase;

public class IsSpotLoadedTestCase extends TestCase{
	public void testIsSpotLoadedTestCase(){
		ParkingLot xpl = new ParkingLot();
		xpl.setName("xxxparkinglot");
		ParkingLot ypl = new ParkingLot();
		ypl.setName("yyyparkinglot");
		
		System.out.println(xpl.isSpotLoaded());
		System.out.println(ypl.isSpotLoaded());
		
		xpl.load();
		ypl.load();
		
		System.out.println(xpl.isSpotLoaded());
		System.out.println(ypl.isSpotLoaded());
	}
}
