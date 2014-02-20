package model;

import java.util.List;
import java.util.Map;

import org.apache.tomcat.jdbc.pool.DataSource;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.jdbc.core.JdbcTemplate;


public class ParkingLotsDAO{
	private ApplicationContext applicationContext;
	private JdbcTemplate jdbcTemplate;
	private static final String SQL = "select * from parkinglot";
	
	public static ParkingLotsDAO createInstance(){
		return new ParkingLotsDAO();
	}
	
	private void connectToDataSource(){
		applicationContext = new ClassPathXmlApplicationContext();
		DataSource dataSource = (DataSource) applicationContext.getBean("parkingLots");
		jdbcTemplate = new JdbcTemplate(dataSource);
	}
	
	@SuppressWarnings("unchecked")
	public List<Map<String,Object>> load(){
		connectToDataSource();
		
		List<Map<String,Object>> results = null;
		
		results = jdbcTemplate.queryForList(SQL);
		
		return results;
	}

	public ApplicationContext getApplicationContext() {
		return applicationContext;
	}

	public void setApplicationContext(ApplicationContext applicationContext) {
		this.applicationContext = applicationContext;
	}

	public JdbcTemplate getJdbcTemplate() {
		return jdbcTemplate;
	}

	public void setJdbcTemplate(JdbcTemplate jdbcTemplate) {
		this.jdbcTemplate = jdbcTemplate;
	}
	
}
