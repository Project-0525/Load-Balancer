const nodes = ["Node-A", "Node-B", "Node-C"];
const nodeHealth = { "Node-A": true, "Node-B": true, "Node-C": true };
const metrics = { requests: 0, perNode: { "Node-A": 0, "Node-B": 0, "Node-C": 0 } };
const rateLimit = {};
const RATE_LIMIT_THRESHOLD = 5;

function identifyNode(ip, selectedNode) {
  const timestamp = new Date().toISOString();
  console.log('[${timestamp}] Incoming IP: ${ip} → Routed to: ${selectedNode}');
}

function hashIP(ip) {
  return ip.split(".").reduce((acc, octet) => acc + parseInt(octet), 0);
}

function LoadBalancer(ip) {
  rateLimit[ip] = (rateLimit[ip] || 0) + 1;
  if (rateLimit[ip] > RATE_LIMIT_THRESHOLD) {
    console.log('Rate limit exceeded for IP: ${ip}');
    return null;
  }

  let index = hashIP(ip) % nodes.length;
  let selectedNode = nodes[index];

  if (!nodeHealth[selectedNode]) {
    selectedNode = nodes.find(node => nodeHealth[node]) || "No-Healthy-Node";
  }

  metrics.requests++;
  if (metrics.perNode[selectedNode] !== undefined) {
    metrics.perNode[selectedNode]++;
  }

  identifyNode(ip, selectedNode);
  return selectedNode;
}

module.exports = { LoadBalancer, metrics, nodeHealth };
