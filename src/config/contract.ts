export const CARESPLIT_ADDRESS = '0x22c39856d31299cd175a30dceaef23007b9e62c2';

export const CARESPLIT_ABI = [
  "function createGroup(uint256 _contributionAmount, uint256 _maxMembers, uint256 _votingThreshold) external returns (uint256)",
  "function joinGroup(uint256 _groupId) external",
  "function contribute(uint256 _groupId) external payable",
  "function requestWithdrawal(uint256 _groupId, uint256 _amount, string memory _reason) external returns (uint256)",
  "function voteOnRequest(uint256 _requestId, bool _approve) external",
  "function executeWithdrawal(uint256 _requestId) external",
  "function getGroup(uint256 _groupId) external view returns (tuple(uint256 id, address creator, uint256 contributionAmount, uint256 maxMembers, uint256 votingThreshold, uint256 totalBalance, uint256 memberCount, bool isActive, uint256 createdAt))",
  "function getTotalGroups() external view returns (uint256)",
  "function getGroupBalance(uint256 _groupId) external view returns (uint256)",
  "event GroupCreated(uint256 indexed groupId, address indexed creator, uint256 contributionAmount, uint256 maxMembers, uint256 votingThreshold)",
  "event MemberJoined(uint256 indexed groupId, address indexed member)",
  "event ContributionMade(uint256 indexed groupId, address indexed member, uint256 amount)"
];
