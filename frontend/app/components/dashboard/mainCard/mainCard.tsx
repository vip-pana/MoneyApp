import { Card, CardBody, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import HistoryPanel from "./historyPanel/historyPanel";

const MainCard = () => {
  return (
    <Card>
      <CardBody>
        <Tabs isFitted variant="soft-rounded" size={"md"}>
          <TabList>
            <Tab>Chart</Tab>
            <Tab>History</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <p>one!</p>
            </TabPanel>
            <TabPanel>
              <HistoryPanel />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </CardBody>
    </Card>
  );
};

export default MainCard;
